"use strict";
// const ursa = require("ursa");
// import { given } from "@nivinjoseph/n-defensive";
// import "@nivinjoseph/n-ext";
// // public
// export class AsymmetricEncryption
// {
//     private constructor() { }
//     public static generateKeyPair(): Promise<string>
//     {
//         const key = ursa.generatePrivateKey();
//         return Promise.resolve(key.toPrivatePem().toString("hex").toUpperCase());
//     }
//     public static getPublicKey(keyPair: string): Promise<string>
//     {
//         given(keyPair, "keyPair").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         keyPair = keyPair.trim();
//         const key = ursa.createPrivateKey(Buffer.from(keyPair, "hex"));
//         return Promise.resolve(key.toPublicPem().toString("hex").toUpperCase());
//     }
//     public static encrypt(keyPairOrPublicKey: string, value: string): Promise<string>
//     {
//         given(keyPairOrPublicKey, "keyPairOrPublicKey").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         keyPairOrPublicKey = keyPairOrPublicKey.trim();
//         value = value.trim();
//         const buf = Buffer.from(keyPairOrPublicKey, "hex");    
//         let key;
//         try 
//         {
//             key = ursa.createPublicKey(buf);
//         }
//         catch (error)
//         {
//             key = ursa.createPrivateKey(buf);
//         }
//         const encrypted = key.encrypt(Buffer.from(value, "utf8"), "utf8", "hex", ursa.RSA_PKCS1_PADDING);
//         return Promise.resolve(encrypted.toUpperCase());
//     }
//     public static decrypt(keyPair: string, value: string): Promise<string>
//     {
//         given(keyPair, "keyPair").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         given(value, "value").ensureHasValue().ensureIsString().ensure(t => !t.isEmptyOrWhiteSpace());
//         keyPair = keyPair.trim();
//         value = value.trim();
//         const key = ursa.createPrivateKey(Buffer.from(keyPair, "hex"));
//         const decrypted = key.decrypt(Buffer.from(value, "hex"), "hex", "utf8", ursa.RSA_PKCS1_PADDING); 
//         return Promise.resolve(decrypted);
//     }
// }
//# sourceMappingURL=asymmetric-encryption.js.map