import { Uuid } from "@nivinjoseph/n-util";
import { globalComponentElementTypeCache } from "./element-type-cache";
import { LoaderContext } from "webpack";


export class FunctionNode
{
    private readonly _isDebug: boolean;
    private readonly _text: string;
    private readonly _parentRefIndex: number;
    private readonly _functionInputType: string;
    private readonly _parent: FunctionNode | null;
    private readonly _isRoot: boolean;
    private readonly _childNodes = new Array<FunctionNode>();
    private readonly _id: string;
    private _functionIndex!: number;
    // @ts-expect-error: not used atm
    private _curlyStart!: number;
    private _curlyEnd!: number;
    private _functionCode!: string;
    private _thinnedCode!: string;
    private _regeneratedCode!: string;
    private _doNotProcess = false;


    public constructor(isDebug: boolean, text: string, parentRefIndex: number, functionInputType: string, parent?: FunctionNode)
    {
        this._isDebug = isDebug;
        this._text = text;
        this._parentRefIndex = parentRefIndex;
        this._functionInputType = functionInputType;
        this._parent = parent ?? null;
        this._isRoot = parent == null;
        this._id = Uuid.create();
    }

    public preProcess(): void
    {
        this._locateCurlyBeginningEnd();
        this._createChildNodes();
        this._thinOutCode();
    }

    public regenerate(context: LoaderContext<any>): void
    {
        if (this._doNotProcess)
        {
            this._regeneratedCode = this._thinnedCode;
            return;
        }
            
        
        let renderFn = this._thinnedCode;
        
        const attrsExtracts = new Array<{ element: string; variable: string; value: string; }>();
        // TODO: implement this
        // const eventsExtracts = new Array<{ element: string; variable: string; value: string; }>();
        
        [...globalComponentElementTypeCache!.keys()]
            .forEach(key =>
            {
                const hasRequiredAttrs = globalComponentElementTypeCache!.get(key)!.hasRequiredAttrs;
                const hasModel = globalComponentElementTypeCache!.get(key)!.hasModel;

                // Step 1: Check basic component declaration with no arguments
                // eslint-disable-next-line no-useless-escape
                const noArgsSyntax = new RegExp(`_c\\(\\s*\\"${key.substring(1, key.length -1)}\\"\\s*\\)`, "g");
                // eslint-disable-next-line no-useless-escape
                const noArgsSyntaxWithSlot = new RegExp(`_c\\(\\s*\\"${key.substring(1, key.length -1)}\\"\\s*,\\s*\\[`, "g");
                // const modifiedCheckSyntax = `_c(${key} + ""`;
                if (noArgsSyntax.test(renderFn) || noArgsSyntaxWithSlot.test(renderFn))
                {
                    if (hasModel)
                    {
                        context.emitError(new Error(`Component ${key} has model but none provided.`));
                        return;
                    }

                    if (hasRequiredAttrs)
                    {
                        context.emitError(new Error(`Component ${key} has required parameters but none provided.`));
                        return;
                    }

                    renderFn = renderFn
                        .replaceAll(noArgsSyntax as any, `_c(${key} + "")`)
                        .replaceAll(noArgsSyntaxWithSlot as any, `_c(${key} + "", [`);
                }
                // {
                //     if (schema !== "any")
                //     {
                //         if (schema.contains("Partial<"))
                //         {
                //             if (schema.contains("&"))
                //             {
                //                 // has required
                //                 this.emitError(new Error(`Component ${key} has required parameters but none provided.`));
                //             }
                //         }
                //         else
                //         {
                //             // has required
                //             this.emitError(new Error(`Component ${key} has required parameters but none provided.`));
                //         }
                //     }
                // }

                // Step 2: Check component declaration with args. Validate that attrs exist if there are required Args

                // eslint-disable-next-line no-useless-escape
                const test = new RegExp(`_c\\(\\s*\\"${key.substring(1, key.length - 1)}\\"\\s*\\,`, "g");
                if (test.test(renderFn))
                    renderFn = renderFn.replaceAll(test as any, `_c(${key},`);

                let instanceCount = 0;
                // console.log("key", key);
                const syntax = `_c(${key},`;
                const modifiedSyntax = `_c(${key} + "",`;
                let fileAddedAsDependency = false;
                while (renderFn.contains(syntax))
                {
                    if (!fileAddedAsDependency)
                    {
                        context.addDependency(globalComponentElementTypeCache!.get(key)!.filePath);
                        fileAddedAsDependency = true;
                    }

                    instanceCount++;
                    const componentIndex = renderFn.indexOf(syntax);
                    let componentIndexEnd = 0;
                    let parenCount = 1;
                    let componentCode = renderFn.substring(componentIndex + syntax.length);
                    for (let i = 0; i < componentCode.length; i++)
                    {
                        if (parenCount === 0)
                        {
                            componentIndexEnd = i;
                            break;
                        }

                        const char = componentCode[i];
                        if (char === "(")
                            parenCount++;
                        else if (char === ")")
                            parenCount--;
                    }
                    componentCode = componentCode.substring(0, componentIndexEnd);


                    // if (hasModel && hasRequiredAttrs)
                    // {
                    //     if (!componentCode.contains("model:"))
                    //     {
                    //         this.emitError(new Error(`Component ${key} has model but none provided.`));
                    //         return;
                    //     }

                    //     if (!componentCode.contains("attrs:"))
                    //     {
                    //         this.emitError(new Error(`Component ${key} has required parameters but none provided.`));
                    //         return;
                    //     }  
                    // }

                    if (hasModel)
                    {
                        if (!componentCode.contains("model:"))
                        {
                            context.emitError(new Error(`Component ${key} has model but none provided.`));
                            return;
                        }
                    }

                    if (hasRequiredAttrs)
                    {
                        if (!componentCode.contains("attrs:"))
                        {
                            context.emitError(new Error(`Component ${key} has required parameters but none provided.`));
                            return;
                        }
                    }
                    
                    if (hasModel)
                    {
                        const modelCode = componentCode.replace("model: {", `model: <${globalComponentElementTypeCache!.get(key)!.modelSchema}>{`);
                        renderFn = renderFn.replace(componentCode, modelCode);
                    }
                
                    if (!componentCode.contains("attrs:"))
                    {
                        renderFn = renderFn.replace(syntax, modifiedSyntax);
                        continue;
                    }

                    // if (!componentCode.contains("attrs:"))
                    // {
                    //     if (hasRequiredAttrs)
                    //     {
                    //         this.emitError(new Error(`Component ${key} has required parameters but none provided.`));
                    //         return;
                    //     }
                    //     else
                    //     {
                    //         renderFn = renderFn.replace(syntax, modifiedSyntax);
                    //         continue;
                    //     }
                    // }


                    const attrsIndex = renderFn.indexOf("attrs:", componentIndex);
                    const split = renderFn.split("");
                    const before = split.take(attrsIndex);                    
                    const after = split.skip(attrsIndex);
                    // const afterMod = after.replace("attrs:", `attrs:<${globalComponentElementTypeCache.get(key)}>`);
                    // console.log(afterMod);
                    // transformed = before.replace(syntax, modifiedSyntax) + afterMod;

                    let curlyCount = 0;
                    let endValue = 0;
                    const toExtract = after.skip("attrs:".length).join("").trimStart().split("");
                    for (let i = 0; i < toExtract.length; i++)
                    {
                        if (i > 0 && curlyCount === 0)
                        {
                            endValue = i;
                            break;
                        }

                        const char = toExtract[i];
                        if (char === "{")
                            curlyCount++;
                        else if (char === "}")
                            curlyCount--;
                    }

                    const extracted = toExtract.join("").substring(0, endValue);
                    const variable = `${key.replaceAll("-", "_").replaceAll("\"", "")}_attrs_${instanceCount}`;
                    
                    
                    
                    attrsExtracts.push({
                        element: key,
                        variable,
                        value: extracted
                    });

                    renderFn = before.join("").replace(syntax, modifiedSyntax) + `attrs: ${variable}` + toExtract.skip(endValue).join("");
                    
                }
            });
            
        if (!this._isRoot)
        {
            const joined = renderFn;
            const funcIndex = joined.indexOf("function (",);
            const funcIndexEnd = joined.indexOf(")", funcIndex);
            const funcParams = joined.substring(funcIndex + "function (".length, funcIndexEnd);
            // console.log("func params", funcParams);

            // const varIndex = joined.lastIndexOf("_vm.", funcIndex);
            // const varName = joined.substring(varIndex + "_vm.".length, funcIndex).trim().replace(",", "");
            // console.log(varName);

            const typedFuncParams = funcParams.split(",").map((param, index) =>
            {
                let paramType = "any";
                if (index === 0)
                    paramType = `ArrayType<typeof ${this._functionInputType}>`;
                else if (index === 1)
                    paramType = "number";

                return `${param}: ${paramType}`;

                // const i = extracted.indexOf(`: ${param}`);
                // const j = extracted.lastIndexOf(" ", i);
                // const paramKey = extracted.substring(j, i);
                // console.log(param, paramKey);
                // const modifiedParam = 
            });
            
            renderFn = joined.substring(0, funcIndex) + `function (${typedFuncParams.join(",")})`
                + joined.substring(funcIndexEnd + 1).replace("{", `{
                    ${attrsExtracts.isNotEmpty ? attrsExtracts.map(t => `var ${t.variable}: ${globalComponentElementTypeCache!.get(t.element)!.attrsSchema} = ${t.value}`).join(";") + ";" : ""}`);

            if (this._isDebug)
            {
                console.log("Joined", joined);    
                console.log("Render", renderFn);
            }
            
            // renderFn = (joined.substring(0, funcIndex) + `function (${typedFuncParams.join(",")})` + joined.substring(funcIndexEnd + 1))
            //     .replace(`return ${syntax}`, `var ${variable}: ${globalComponentElementTypeCache!.get(key)!.attrsSchema} = ${extracted}; return ${modifiedSyntax}`) + `attrs: ${variable}` + toExtract.skip(endValue).join("");
        }
        else
        {
            const helperTypes = `type Child<T, K extends keyof T> = T[K]; type ArrayType<T> = T extends ReadonlyArray<infer K> ? K : never;`;
            
            renderFn = renderFn
                .replace("function ()", `function (this: ${this._functionInputType})`)
                .replace("var _vm = this", `var _vm: ${this._functionInputType} = this; var _vm$ = this as any;
                    ${helperTypes}
                    ${attrsExtracts.map(t => `var ${t.variable}: ${globalComponentElementTypeCache!.get(t.element)!.attrsSchema} = ${t.value}`).join(";")};`);
        }
        
        this._regeneratedCode = renderFn;
        
        
        this._childNodes.forEach(childNode => childNode.regenerate(context));
    }

    public toModdedCode(): string
    {
        let moddedCode = this._regeneratedCode;
        // console.log("regenerated", moddedCode);
        
        this._childNodes.forEach(childNode =>
        {
            moddedCode = moddedCode.replace(childNode._id, childNode.toModdedCode());
        });
        
        if (this._isRoot)
        {
            moddedCode = "var render = " + moddedCode;
            moddedCode = moddedCode
                .replaceAll("_vm._", "_vm$._")
                .replaceAll("_vm.$", "_vm$.$")
                .replaceAll(", arguments)", ", arguments as any)");
        }

        return moddedCode;
    }

    private _locateCurlyBeginningEnd(): void
    {
        const functionIndex = this._text.indexOf("function");
        const firstCurlyIndex = this._text.indexOf("{", functionIndex);

        let curlyCount = 1;
        let lastCurlyIndex = 0;
        for (let i = firstCurlyIndex + 1; i < this._text.length; i++)
        {
            const char = this._text[i];
            if (char === "{")
                curlyCount++;
            else if (char === "}")
                curlyCount--;

            if (curlyCount === 0)
            {
                lastCurlyIndex = i;
                break;
            }
        }

        if (lastCurlyIndex === 0)
            throw new Error("Could not get curly end");

        this._functionIndex = functionIndex;
        this._curlyStart = firstCurlyIndex;
        this._curlyEnd = lastCurlyIndex;
        this._functionCode = this._text.substring(this._functionIndex, this._curlyEnd + 1);
        
        
        try
        {
            // const dollarTest = /\(\s*\$/;
            // const emptyTest = /\(\s*\)/;
            // const propTest = /\(\s*props/;
            const signature = this._functionCode.substring(0, this._functionCode.indexOf("{"));
            // if (signature.contains("$") || signature.contains("props"))
            //     throw new Error("Unparsable function");

            if (!this._isRoot && (this._functionInputType.startsWith("\"") || !this._functionInputType.startsWith("_vm.")))
                throw new Error(`Unparsable function: ${signature}`);

            if (signature.contains("$"))
                throw new Error(`Unparsable built in function: ${signature}`);

            if (!this._isRoot && signature.contains("()"))
                throw new Error(`Unparsable empty function: ${signature}`);

            const scopedSlotsIndex = this._parent?._functionCode.lastIndexOf("scopedSlots", this._parentRefIndex);
            if (scopedSlotsIndex != null && scopedSlotsIndex !== -1)
            {
                const scopedSlotCurlyIndex = this._parent!._functionCode.indexOf("[", scopedSlotsIndex);
                curlyCount = 1;
                let scopedSlotCurlyEndIndex = this._parentRefIndex;
                for (let i = scopedSlotCurlyIndex + 1; i < this._parentRefIndex; i++)
                {
                    const char = this._parent!._functionCode[i];
                    if (char === "[")
                        curlyCount++;
                    else if (char === "]")
                        curlyCount--;

                    if (curlyCount === 0)
                    {
                        scopedSlotCurlyEndIndex = i;
                        break;
                    }
                }

                if (this._parentRefIndex > scopedSlotCurlyIndex && this._parentRefIndex <= scopedSlotCurlyEndIndex)
                    throw new Error(`Unparsable scoped slot function: ${signature}`);
            }
        }
        catch (error)
        {
            if (this._isDebug)
                console.warn((error as Error).message);
            
            this._doNotProcess = true;
        }
    }

    private _createChildNodes(): void
    {
        if (this._doNotProcess)
            return;
        
        const sub = this._functionCode.substring(this._functionCode.indexOf("{") + 1);
        const diff = this._functionCode.length - sub.length;
        let start = 0;
        let subFunctionIndex = sub.indexOf("function", start);
        while (subFunctionIndex !== -1)
        {
            const parenIndex = sub.lastIndexOf("(", subFunctionIndex);
            const commaIndex = sub.lastIndexOf(",", subFunctionIndex);
            
            let functionInputType = sub.substring(parenIndex + 1, commaIndex).trim();
            if (parenIndex >= commaIndex)
                functionInputType = "flawed" + functionInputType;

            const childNode = new FunctionNode(this._isDebug, sub.substring(subFunctionIndex), subFunctionIndex + diff, functionInputType, this);
            
            childNode.preProcess();
            this._childNodes.push(childNode);
            
            start = subFunctionIndex + childNode._functionCode.length - 1;
            subFunctionIndex = sub.indexOf("function", start);
        }
    }

    private _thinOutCode(): void
    {
        if (this._childNodes.isNotEmpty)
        {
            let thinnedCode = this._functionCode;

            // const fragments = new Array<string>();

            for (let i = 0; i < this._childNodes.length; i++)
            {
                const childNode = this._childNodes[i];

                thinnedCode = thinnedCode.replace(childNode._functionCode, childNode._id);


                // const startIndex = i === 0 ? 0 : this._childNodes[i - 1]._curlyEnd + 1;
                // fragments.push(this._functionCode.substring(startIndex, childNode._functionIndex));
                // fragments.push(childNode._id);
            }

            // fragments.push(this._functionCode.substring(this._childNodes.takeLast()._curlyEnd + 1));

            // this._thinnedCode = fragments.join("");
            this._thinnedCode = thinnedCode;
            // console.log("fragments", fragments);
        }
        else
        {
            this._thinnedCode = this._functionCode;
        }
    }
}