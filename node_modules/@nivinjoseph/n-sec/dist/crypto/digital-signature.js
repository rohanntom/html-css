"use strict";
// const ursa = require("ursa");
// import { given } from "@nivinjoseph/n-defensive";
// import "@nivinjoseph/n-ext";
// import * as Crypto from "crypto";
// // public
// export class DigitalSignature
// {
//     private constructor() { }
//     public static sign(keyPair: string, value: string): Promise<string>
//     {
//         given(keyPair, "keyPair").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         keyPair = keyPair.trim();
//         value = value.trim();
//         const hash = Crypto.createHash("sha512");
//         hash.update(value, "utf8");
//         const key = ursa.createPrivateKey(Buffer.from(keyPair, "hex"));
//         const signature = key.sign("sha512", hash.digest(), null, "hex");
//         return Promise.resolve(signature.toUpperCase());
//     }
//     public static async verify(keyPairOrPublicKey: string, value: string, signature: string): Promise<boolean>
//     {
//         given(keyPairOrPublicKey, "keyPairOrPublicKey").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         given(signature, "signature").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         keyPairOrPublicKey = keyPairOrPublicKey.trim();
//         value = value.trim();
//         signature = signature.trim();
//         const hash = Crypto.createHash("sha512");
//         hash.update(value, "utf8");
//         try 
//         {
//             const buf = Buffer.from(keyPairOrPublicKey, "hex");
//             let key;
//             try 
//             {
//                 key = ursa.createPublicKey(buf);
//             }
//             catch (error)
//             {
//                 key = ursa.createPrivateKey(buf);
//             }
//             const result = key.verify("sha512", hash.digest(), Buffer.from(signature, "hex"));
//             return Promise.resolve(result);
//         }
//         catch (error)
//         {
//             return Promise.resolve(false);
//         }
//     }
// }
//# sourceMappingURL=digital-signature.js.map