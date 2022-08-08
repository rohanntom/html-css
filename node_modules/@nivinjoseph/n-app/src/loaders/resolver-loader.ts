import * as Path from "path";

export default function (content: string): string
{
    // @ts-expect-error: unsafe use of this
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const dirPath = this.context as string;
    // @ts-expect-error: unsafe use of this
    // eslint-disable-next-line @typescript-eslint/no-invalid-this
    const filePath = this.resourcePath as string;
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