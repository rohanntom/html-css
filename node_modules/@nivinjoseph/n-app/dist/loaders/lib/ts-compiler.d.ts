import * as ts from "typescript";
import { LoaderContext } from "webpack";
export declare const declarationCompileConfig: ts.CompilerOptions;
export declare const combinedCompileConfig: ts.CompilerOptions;
export declare function compile(isDebug: boolean, debugFiles: ReadonlyArray<string>, fileNames: ReadonlyArray<string>, options: ts.CompilerOptions, loaderContext: LoaderContext<any>, isView?: boolean): void;
