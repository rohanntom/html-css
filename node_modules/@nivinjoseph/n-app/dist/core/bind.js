"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bind = exports.bindSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.bindSymbol = Symbol.for("@nivinjoseph/n-app/bind");
// public
function bind(schema) {
    (0, n_defensive_1.given)(schema, "schema").ensureHasValue().ensureIsObject();
    return (target) => Reflect.defineMetadata(exports.bindSymbol, schema, target);
}
exports.bind = bind;
//# sourceMappingURL=bind.js.map