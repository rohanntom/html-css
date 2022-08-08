"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpiredTokenException = void 0;
const n_exception_1 = require("@nivinjoseph/n-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
class ExpiredTokenException extends n_exception_1.Exception {
    constructor(token) {
        (0, n_defensive_1.given)(token, "token").ensureHasValue().ensureIsString();
        token = token.trim();
        super(`Token '${token}' is expired.`);
        this._token = token;
    }
    get token() { return this._token; }
}
exports.ExpiredTokenException = ExpiredTokenException;
//# sourceMappingURL=expired-token-exception.js.map