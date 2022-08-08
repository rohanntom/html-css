"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-invalid-this */
require("@nivinjoseph/n-ext");
const n_config_1 = require("@nivinjoseph/n-config");
const hash = require("hash-sum");
const loaderUtils = require("loader-utils");
const Path = require("path");
function default_1(content) {
    // console.log(this.request);    
    // console.log(content);
    // if (!content.contains(`var __decorate = (this && this.__decorate)`))
    //     return content;
    if (!content.contains("__decorate"))
        return content;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const options = loaderUtils.getOptions(this);
    let hmrView = undefined;
    let defaultPageTitle, defaultPageMetadata;
    if (options)
        ({ defaultPageTitle, defaultPageMetadata, hmrView } = options);
    if (hmrView == null)
        hmrView = "templates";
    // console.log("options", defaultPageTitle, defaultPageMetadata);
    const dirPath = this.context;
    const filePath = this.resourcePath;
    // const relativeFilePath = "./" + Path.relative(this.rootContext, this.resourcePath).replace(/^(\.\.[\/\\])+/, "");
    const fileName = filePath.replace(dirPath + Path.sep, "");
    // console.log("dirPath", dirPath);
    // console.log("filePath", filePath);
    // console.log("relativeFilePath", relativeFilePath);
    // console.log("fileName", fileName);
    // console.log(content);
    // console.log("relativeViewFilePath", relativeViewFilePath);
    // this.addDependency(dirPath + "/" + fileName.replace("-view-model.js", "-view.html"));
    const isJs = fileName.endsWith(".js");
    const className = fileName.replace(isJs ? ".js" : ".ts", "").split("-").map(t => `${t[0].toUpperCase()}${t.substring(1)}`).join("");
    // console.warn(className);
    // console.log(content);
    const componentCode = `
        ${className}.___$typeName = "${className}";
    
        ${className}.___componentOptions = ${className}.createComponentOptions(${className}, ${JSON.stringify(defaultPageTitle)}, ${JSON.stringify(defaultPageMetadata)});
        // console.log(${className}.___componentOptions);
        
        exports.${className} = ${className};
    `;
    content = content.replace(`exports.${className} = ${className};`, componentCode);
    if (n_config_1.ConfigurationManager.getConfig("env") !== "dev")
        return content;
    const viewFileName = fileName.replace(isJs ? "-view-model.js" : "-view-model.ts", "-view.html");
    const relativeViewFilePath = "." + Path.sep + viewFileName;
    // const relativeViewFilePath = relativeFilePath.substr(0, relativeFilePath.length - "-view-model.js".length) + "-view.html";
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const id = hash(className);
    const hotReloadAPIPath = JSON.stringify(require.resolve("vue-hot-reload-api"));
    const vueTemplateCompilerPath = JSON.stringify(require.resolve("vue-template-compiler"));
    const hotReloadCode = `
            if(module.hot)
            {
                const componentOptions = ${className}.___componentOptions;
                
                componentOptions.___viewModel = ${className};
                
                // console.log('is Hot');
                const api = require(${hotReloadAPIPath});
                api.install(require('@nivinjoseph/vue'));
                
                if (!api.compatible) 
                    throw new Error('vue-hot-reload-api is not compatible with the version of Vue you are using.');
                
                module.hot.accept();
                
                if (!api.isRecorded('${id}')) 
                {
                    api.createRecord('${id}', componentOptions);
                    // console.log("creating record", "${id}");
                }
                else 
                {
                    componentOptions.___reload = true;
                    if(componentOptions.___preReload)
                        componentOptions.___preReload(api, componentOptions);
                    api.reload('${id}', componentOptions);
                    // console.log("updating record", "${id}");
                }
                
                const hmrView = "${hmrView}";
                
                const vueTemplateCompiler = hmrView === "templates" ? require(${vueTemplateCompilerPath}) : null;
                
                module.hot.accept('${relativeViewFilePath}', function () {
                    const renderFuncs = hmrView === "templates"
                        ? vueTemplateCompiler.compileToFunctions(require('${relativeViewFilePath}'))
                        : require('${relativeViewFilePath}');
                    if(componentOptions.___preRerender)
                        componentOptions.___preRerender(api, renderFuncs);
                    api.rerender('${id}', renderFuncs);
                    // console.log("re-rendering record", "${id}");
                });
            }
            
            // exports.${className} = ${className};
        `;
    // content = content.replace(`exports.${className} = ${className};`, hotReloadCode);
    // return content;
    return content + hotReloadCode;
    // const callback = this.async();
    // this.loadModule(this.request, (err, source, sourceMap, module) =>
    // {
    //     if (err)
    //     {
    //         callback(err);
    //         return;
    //     }
    //     console.dir()
    // });
}
exports.default = default_1;
//# sourceMappingURL=view-model-loader.js.map