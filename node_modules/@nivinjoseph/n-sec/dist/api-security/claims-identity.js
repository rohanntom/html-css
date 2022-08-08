"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimsIdentity = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
// public
class ClaimsIdentity {
    constructor(claims) {
        (0, n_defensive_1.given)(claims, "claims").ensureHasValue().ensureIsArray();
        this._claims = [...claims];
    }
    get claims() { return this._claims; }
    hasClaim(claim) {
        return this._claims.some(t => t.equals(claim));
    }
}
exports.ClaimsIdentity = ClaimsIdentity;
//# sourceMappingURL=claims-identity.js.map