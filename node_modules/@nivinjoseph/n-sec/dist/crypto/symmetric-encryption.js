"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SymmetricEncryption = void 0;
const Crypto = require("crypto");
const crypto_exception_1 = require("./crypto-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
class SymmetricEncryption {
    constructor() { }
    static generateKey() {
        return new Promise((resolve, reject) => {
            Crypto.randomBytes(32, (err, buf) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(buf.toString("hex").toUpperCase());
            });
        });
    }
    static encrypt(key, value) {
        return new Promise((resolve, reject) => {
            (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
            (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsString();
            key = key.trim();
            value = value.trim();
            Crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    reject(err);
                    return;
                }
                try {
                    const iv = buf;
                    const cipher = Crypto.createCipheriv("AES-256-CBC", Buffer.from(key, "hex"), iv);
                    let encrypted = cipher.update(value, "utf8", "hex");
                    encrypted += cipher.final("hex");
                    const cipherText = `${encrypted}.${iv.toString("hex")}`;
                    resolve(cipherText.toUpperCase());
                }
                catch (error) {
                    reject(error);
                }
            });
        });
    }
    static decrypt(key, value) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsString();
        key = key.trim();
        value = value.trim();
        const splitted = value.split(".");
        if (splitted.length !== 2)
            throw new crypto_exception_1.CryptoException("Invalid value.");
        const iv = Buffer.from(splitted[1], "hex");
        const deCipher = Crypto.createDecipheriv("AES-256-CBC", Buffer.from(key, "hex"), iv);
        let decrypted = deCipher.update(splitted[0], "hex", "utf8");
        decrypted += deCipher.final("utf8");
        return decrypted;
    }
}
exports.SymmetricEncryption = SymmetricEncryption;
//# sourceMappingURL=symmetric-encryption.js.map