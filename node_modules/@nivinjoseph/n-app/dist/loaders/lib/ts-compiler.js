"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = exports.combinedCompileConfig = exports.declarationCompileConfig = void 0;
const Path = require("path");
const Fs = require("fs");
const ts = require("typescript");
const memfs_1 = require("memfs");
exports.declarationCompileConfig = {
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
exports.combinedCompileConfig = {
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
function compile(isDebug, debugFiles, fileNames, options, loaderContext, isView = false) {
    const host = ts.createCompilerHost(options);
    host.writeFile = (fileName, contents) => {
        // console.log("Writing file ===> " + fileName);
        const dir = Path.dirname(fileName);
        if (!memfs_1.fs.existsSync(dir))
            memfs_1.fs.mkdirSync(dir, { recursive: true });
        memfs_1.fs.writeFileSync(fileName, contents, { encoding: "utf-8" });
        if (isDebug) {
            if (!isView) {
                if (debugFiles.contains(fileName.replace(".d.ts", "")))
                    Fs.writeFileSync(fileName, contents, "utf8");
            }
        }
    };
    const originalReadFile = host.readFile.bind(host);
    host.readFile = (filename) => {
        // const file = Path.basename(filename);
        // if (file.endsWith("-view-model.temp.ts"))
        //     return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;
        // if (file.endsWith(".d.ts"))
        // {
        //     if (MemFs.existsSync(filename))
        //         return MemFs.readFileSync(filename, { encoding: "utf-8" }) as string;
        // }
        if (memfs_1.fs.existsSync(filename))
            return memfs_1.fs.readFileSync(filename, { encoding: "utf-8" });
        return originalReadFile(filename);
    };
    const program = ts.createProgram(fileNames, options, host);
    const emitResult = program.emit();
    if (!isView)
        return;
    const allDiagnostics = ts
        .getPreEmitDiagnostics(program)
        .concat(emitResult.diagnostics);
    allDiagnostics.forEach(diagnostic => {
        if (diagnostic.file && fileNames.contains(diagnostic.file.fileName)) {
            const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (isView) {
                const viewFile = Path.basename(diagnostic.file.fileName).replace("-view-model.temp.ts", "-view.html");
                const viewFilePath = Path.join(Path.dirname(diagnostic.file.fileName), viewFile);
                loaderContext.emitError(new Error(`${viewFilePath} : ${message}`));
            }
            else {
                const { line, character } = ts.getLineAndCharacterOfPosition(diagnostic.file, diagnostic.start);
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
exports.compile = compile;
//# sourceMappingURL=ts-compiler.js.map