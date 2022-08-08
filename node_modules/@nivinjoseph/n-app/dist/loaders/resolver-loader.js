"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
function default_1(content) {
    // @ts-expect-error: unsafe use of this
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const dirPath = this.context;
    // @ts-expect-error: unsafe use of this
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const filePath = this.resourcePath;
    // const relativeFilePath = "./" + Path.relative(this.rootContext, this.resourcePath).replace(/^(\.\.[\/\\])+/, "");
    const fileName = filePath.replace(dirPath + Path.sep, "");
    const isJs = fileName.endsWith(".js");
    const className = fileName.replace(isJs ? ".js" : ".ts", "").split("-").map(t => `${t[0].toUpperCase()}${t.substring(1)}`).join("");
    const componentCode = `
        ${className}.___$typeName = "${className}";
        
        exports.${className} = ${className};
    `;
    content = content.replace(`exports.${className} = ${className};`, componentCode);
    return content;
}
exports.default = default_1;
//# sourceMappingURL=resolver-loader.js.map