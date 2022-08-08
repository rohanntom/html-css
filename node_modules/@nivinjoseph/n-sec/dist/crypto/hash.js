"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hash = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const Crypto = require("crypto");
// public
class Hash {
    constructor() { }
    static create(value) {
        (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsString();
        value = value.trim();
        const hash = Crypto.createHash("sha512");
        hash.update(value, "utf8");
        return hash.digest("hex").toUpperCase();
    }
    static createUsingSalt(value, salt) {
        (0, n_defensive_1.given)(value, "value").ensureHasValue().ensureIsString();
        (0, n_defensive_1.given)(salt, "salt").ensureHasValue().ensureIsString();
        value = value.trim();
        salt = salt.trim();
        const reverse = (val) => {
            let rev = "";
            for (let i = 0; i < val.length; i++)
                rev = val[i] + rev;
            return rev;
        };
        const valueReverse = reverse(value);
        const saltReverse = reverse(salt);
        const saltedValue = "{1}{0}{2}{1}{3}{1}{2}".format(value, salt, valueReverse, saltReverse);
        return Hash.create(saltedValue);
    }
}
exports.Hash = Hash;
//# sourceMappingURL=hash.js.map