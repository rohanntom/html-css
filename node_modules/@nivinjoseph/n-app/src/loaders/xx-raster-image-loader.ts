// import "@nivinjoseph/n-ext";
// import * as Sharp from "sharp";
// const loaderUtils = require("loader-utils");
// import * as Path from "path";
// import { TypeHelper, Uuid } from "@nivinjoseph/n-util";
// import { ConfigurationManager } from "@nivinjoseph/n-config";
// const imagemin = require("imagemin");


// interface ResizedImage
// {
//     // name: string;
//     ext: string;
//     width: number;
//     height: number;
//     size: number;
//     data: Buffer;
// }

// function resize(filePath: string, width: number, height: number): Promise<ResizedImage>
// {
//     const promise = new Promise<ResizedImage>((resolve, reject) =>
//     {
//         Sharp(filePath)
//             // .resize(width, height, {fit: "inside"})
//             .resize(width, height)
//             .toBuffer((err: any, buf: any, info) =>
//             {
//                 err ? reject(err) : resolve({
//                     // name: fileName.endsWith(info.format) ? fileName : fileName + "." + info.format,
//                     ext: info.format.toLowerCase(),
//                     width: info.width,
//                     height: info.height,
//                     size: info.size,
//                     data: buf
//                 });
//             });
//     });

//     // We could optionally optimize the image here using
//     // https://github.com/imagemin/imagemin

//     return promise;
// }


// // @ts-ignore
// // tslint:disable-next-line: no-default-export
// export default function (content: any)
// {
//     const MIMES: { [index: string]: string } = {
//         "jpg": "image/jpeg",
//         "jpeg": "image/jpeg",
//         "png": "image/png",
//         "gif": "image/gif"
//     };

//     const ext = Path.extname(this.resourcePath).replace(/\./, "").toLowerCase();
//     if (!MIMES[ext])
//         throw new Error(`Unsupported format for file '${this.resourcePath}'`);

//     const parsedResourceQuery = this.resourceQuery ? loaderUtils.parseQuery(this.resourceQuery) : {};
//     Object.keys(parsedResourceQuery)
//         .filter(t => ["width", "height"].contains(t))
//         .forEach(t => parsedResourceQuery[t] = TypeHelper.parseNumber(parsedResourceQuery[t]));

//     const { width, height } = parsedResourceQuery;

//     const options = loaderUtils.getOptions(this) || {};
//     const context = options.context || this.rootContext;
    
//     const isDev = ConfigurationManager.getConfig<string>("env") === "dev";

//     // const limit = options.limit;
//     const callback = this.async();

//     const plugins = [
//         require("imagemin-gifsicle")({}),
//         require("imagemin-mozjpeg")({}),
//         // require("imagemin-svgo")({}),
//         // require("imagemin-pngquant")({}),
//         require("imagemin-optipng")({}),
//         // require("imagemin-webp")({})
//     ];

//     if (width || height)
//     {
//         resize(this.resourcePath, width, height)
//             .then(resized =>
//             {
//                 // console.log("resized size", resized.size);

//                 imagemin.buffer(resized.data, { plugins })
//                     .then((data: Buffer) =>
//                     {
//                         // const size = data.byteLength;

//                         // console.log("minified size", size);


//                         const url = loaderUtils.interpolateName(this,
//                             `[contenthash]${isDev ? "" : Uuid.create()}.${resized.ext}`, {
//                             context,
//                             content: data
//                         });

//                         const outputPath = url;
//                         const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

//                         this.emitFile(outputPath, data);

//                         callback(null, `module.exports = ${publicPath}`);
//                     })
//                     .catch((e: any) => callback(e));
//             })
//             .catch(e => callback(e));
//     }
//     else
//     {
//         const original = typeof content === "string" ? Buffer.from(content) : content as Buffer;

//         // console.log("original size", original.byteLength);

//         imagemin.buffer(original, { plugins })
//             .then((data: Buffer) =>
//             {
//                 // const size = data.byteLength;

//                 // console.log("minified size", size);


//                 const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
//                     context,
//                     content: data
//                 });

//                 const outputPath = url;
//                 const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

//                 this.emitFile(outputPath, data);

//                 callback(null, `module.exports = ${publicPath}`);


//                 // if (limit && size > limit)
//                 // {
//                 //     const url = loaderUtils.interpolateName(this, `[contenthash].${ext}`, {
//                 //         context,
//                 //         content: data
//                 //     });

//                 //     const outputPath = url;
//                 //     const publicPath = `__webpack_public_path__ + ${JSON.stringify(outputPath)}`;

//                 //     this.emitFile(outputPath, data);

//                 //     callback(null, `module.exports = ${publicPath}`);
//                 // }
//                 // else
//                 // {
//                 //     const base64 = JSON.stringify("data:" + MIMES[ext] + ";" + "base64," + data.toString("base64"));
//                 //     callback(null, `module.exports = ${base64}`);
//                 // }
//             })
//             .catch((e: any) => callback(e));
//     }
// }

// export const raw = true;