"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-unsafe-call */
// import { compileToFunctions } from "vue-template-compiler";
const Path = require("path");
const Fs = require("fs");
const memfs_1 = require("memfs");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const element_type_cache_1 = require("./lib/element-type-cache");
const ts_compiler_1 = require("./lib/ts-compiler");
const view_transformer_1 = require("./lib/view-transformer");
const getOptions = require("loader-utils").getOptions;
module.exports = function (src) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        // console.log("Ts-check loading", this.resourcePath);
        // console.log(globalComponentElementTypeCache);
        const callback = this.async();
        try {
            const options = (getOptions(this) || {});
            const isDebug = !!options.debug;
            let debugFiles = (_a = options.debugFiles) !== null && _a !== void 0 ? _a : [];
            (0, n_defensive_1.given)(debugFiles, "debugFiles").ensureHasValue().ensureIsArray();
            debugFiles = debugFiles.map(t => Path.join(Path.dirname(t), Path.basename(t).split(".").takeFirst()));
            const filePath = this.resourcePath;
            const dir = Path.dirname(filePath);
            const file = Path.basename(filePath);
            const viewModelFile = file.replace("-view.html", "-view-model.ts");
            let isDebugFile = false;
            if (isDebug)
                isDebugFile = debugFiles.some(t => t.contains(this.resourcePath.replace(Path.extname(this.resourcePath), "")));
            if (!dir.contains("node_modules"))
                (0, ts_compiler_1.compile)(isDebug, debugFiles, [Path.join(dir, viewModelFile)], ts_compiler_1.declarationCompileConfig, this);
            const declarationFile = file.replace("-view.html", "-view-model.d.ts");
            const declaration = dir.contains("node_modules")
                ? Fs.readFileSync(Path.join(dir, declarationFile), "utf8")
                : memfs_1.fs.readFileSync(Path.join(dir, declarationFile), "utf8");
            const className = file.replace("-view.html", "").split("-")
                .map(t => t.split("").takeFirst().toUpperCase() + t.split("").skip(1).join(""))
                .join("") + "ViewModel";
            const staticRenderFnsKey = "var staticRenderFns =";
            let [renderFn, staticRenderFns] = src.split(staticRenderFnsKey);
            staticRenderFns = staticRenderFnsKey + staticRenderFns;
            if (isDebugFile)
                console.log(renderFn);
            renderFn = (0, view_transformer_1.transformRenderFns)(isDebugFile, renderFn, this, className);
            staticRenderFns = staticRenderFns
                .replaceAll(", arguments)", ", arguments as any)")
                .replace("render._withStripped", ";(<any>render)._withStripped");
            const combinedContents = `
    ${declaration}
    
    ${renderFn}
    
    ${staticRenderFns}
    `;
            const combinedFile = file.replace("-view.html", "-view-model.temp.ts");
            const combinedFilePath = Path.join(dir, combinedFile);
            if (!memfs_1.fs.existsSync(dir))
                memfs_1.fs.mkdirSync(dir, { recursive: true });
            memfs_1.fs.writeFileSync(combinedFilePath, combinedContents, { encoding: "utf-8" });
            if (isDebug) {
                if (debugFiles.contains(combinedFilePath.replace(".temp.ts", "")))
                    yield Fs.promises.writeFile(combinedFilePath, combinedContents, "utf8");
            }
            (0, ts_compiler_1.compile)(isDebug, debugFiles, [combinedFilePath], ts_compiler_1.combinedCompileConfig, this, true);
            callback(null, src);
        }
        catch (error) {
            callback(error);
        }
    });
};
module.exports.pitch = function () {
    // console.log("Ts-check pitching", this.resourcePath);
    // if (this.mode !== "production")
    //     return;
    (0, element_type_cache_1.populateGlobalElementTypeCache)(this);
    // console.log(globalComponentElementTypeCache);
};
// interface Foo
// {
//     num: number;
//     str: string;
//     bool: boolean;
//     func: Function;
//     array: Array<any>;
//     object: object;
// }
// type Foo = { a: string; b: number; };
// type Bar = { c: string; d: number; };
// type ParFoo = Partial<Foo>;
// const s: Partial<Foo> & Bar = {
//     a: "",
//     "s": 4,
// };
// const ["s"] = <{ "max-file-size": number; "multiple": boolean; } & { "id": string; "mime-types": string; }>{
//     id: "",
//     "mime-types": "",
//     "max-file-size": 5,
//     multiple: true,
//     foo: 4
// };
//# sourceMappingURL=view-ts-check-loader.js.map