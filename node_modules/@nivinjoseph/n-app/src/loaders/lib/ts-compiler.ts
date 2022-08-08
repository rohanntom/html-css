import * as Path from "path";
import * as Fs from "fs";
import * as ts from "typescript";
import { LoaderContext } from "webpack";
import { fs as MemFs } from "memfs";


export const declarationCompileConfig: ts.CompilerOptions = {
    "module": ts.ModuleKind.CommonJS,
    "moduleResolution": ts.ModuleResolutionKind.NodeJs,
    "target": ts.ScriptTarget.ES2015,
    emitDeclarationOnly: true,
    declaration: true,
    strict: false,
    strictNullChecks: false,
    strictFunctionTypes: false,
    noImplicitAny: false,
    noImplicitThis: false,
    noImplicitReturns: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: false,
    noEmitOnError: false,
    "sourceMap": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "removeComments": false,
    "forceConsistentCasingInFileNames": false,
    "incremental": false,
    "skipLibCheck": true,
    "importHelpers": true,
    "noEmitHelpers": true,
    "noImplicitOverride": true,
    "pretty": false
};

export const combinedCompileConfig: ts.CompilerOptions = {
    "module": ts.ModuleKind.CommonJS,
    "moduleResolution": ts.ModuleResolutionKind.NodeJs,
    "target": ts.ScriptTarget.ES2015,
    // emitDeclarationOnly: true,
    // declaration: true,
    strict: false,
    strictNullChecks: false,
    strictFunctionTypes: false,
    noImplicitAny: false,
    noImplicitThis: false,
    noImplicitReturns: false,
    noUnusedLocals: false,
    noUnusedParameters: false,
    noFallthroughCasesInSwitch: false,
    "noEmitOnError": true,
    noEmit: true,
    "sourceMap": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "removeComments": false,
    "forceConsistentCasingInFileNames": false,
    "incremental": false,
    "skipLibCheck": true,
    "importHelpers": true,
    "noEmitHelpers": true,
    "noImplicitOverride": true,
    "pretty": false
};


export function compile(isDebug: boolean, debugFiles: ReadonlyArray<string>, fileNames: ReadonlyArray<string>,
    options: ts.CompilerOptions, loaderContext: LoaderContext<any>, isView = false): void
{
    const host = ts.createCompilerHost(options);
    host.writeFile = (fileName: string, contents: string): void =>
    {
        // console.log("Writing file ===> " + fileName);
        const dir = Path.dirname(fileName);
        if (!MemFs.existsSync(dir))
            MemFs.mkdirSync(dir, { recursive: true });

        MemFs.writeFileSync(fileName, contents, { encoding: "utf-8" });
        if (isDebug)
        {
            if (!isView)
            {
                if (debugFiles.contains(fileName.replace(".d.ts", "")))
                    Fs.writeFileSync(fileName, contents, "utf8");
            }
        }
    };

    const originalReadFile = host.readFile.bind(host);
    host.readFile = (filename: string): string | undefined => 
    {
        // const file = Path.basename(filename);
        // if (file.endsWith("-view-model.temp.ts"))
        //     return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;

        // if (file.endsWith(".d.ts"))
        // {
        //     if (MemFs.existsSync(filename))
        //         return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;
        // }

        if (MemFs.existsSync(filename))
            return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;

        return originalReadFile(filename);
    };

    const program = ts.createProgram(fileNames, options, host);
    const emitResult = program.emit();

    if (!isView)
        return;

    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);

    allDiagnostics.forEach(diagnostic =>
    {
        if (diagnostic.file && fileNames.contains(diagnostic.file.fileName))
        {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");

            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (isView)
            {
                const viewFile = Path.basename(diagnostic.file.fileName).replace("-view-model.temp.ts", "-view.html");
                const viewFilePath = Path.join(Path.dirname(diagnostic.file.fileName), viewFile);
                loaderContext.emitError(new Error(`${viewFilePath} : ${message}`));
            }
            else
            {
                const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start!);

                // console.log(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
                loaderContext.emitError(new Error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`));
            }
        }
        // else
        // {
        //     console.log(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
        // }
    });

    // const exitCode = emitResult.emitSkipped ? 1 : 0;
    // console.error(`Process exiting with code '${exitCode}'.`);
    // process.exit(exitCode);
}