import { LoaderContext } from "webpack";
export declare class FunctionNode {
    private readonly _isDebug;
    private readonly _text;
    private readonly _parentRefIndex;
    private readonly _functionInputType;
    private readonly _parent;
    private readonly _isRoot;
    private readonly _childNodes;
    private readonly _id;
    private _functionIndex;
    private _curlyStart;
    private _curlyEnd;
    private _functionCode;
    private _thinnedCode;
    private _regeneratedCode;
    private _doNotProcess;
    constructor(isDebug: boolean, text: string, parentRefIndex: number, functionInputType: string, parent?: FunctionNode);
    preProcess(): void;
    regenerate(context: LoaderContext<any>): void;
    toModdedCode(): string;
    private _locateCurlyBeginningEnd;
    private _createChildNodes;
    private _thinOutCode;
}
