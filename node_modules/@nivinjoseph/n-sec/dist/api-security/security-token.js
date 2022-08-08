"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityToken = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class SecurityToken {
    constructor(scheme, token) {
        (0, n_defensive_1.given)(scheme, "scheme").ensureHasValue().ensureIsString()
            .ensure(t => !t.contains(" "), "cannot contain space");
        this._scheme = scheme;
        (0, n_defensive_1.given)(token, "token").ensureHasValue().ensureIsString()
            .ensure(t => !t.contains(" "), "cannot contain space");
        this._token = token;
    }
    get scheme() { return this._scheme; }
    get token() { return this._token; }
    toString() {
        return `${this._scheme} ${this._token}`;
    }
}
exports.SecurityToken = SecurityToken;
//# sourceMappingURL=security-token.js.map