"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolve = exports.resolveSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const utils_1 = require("./utils");
exports.resolveSymbol = Symbol.for("@nivinjoseph/n-app/resolve");
// public
function resolve(...resolvers) {
    (0, n_defensive_1.given)(resolvers, "resolvers").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty);
    const mapped = resolvers.map(t => {
        return {
            name: utils_1.Utils.getTypeName(t),
            value: t
        };
    });
    return (target) => Reflect.defineMetadata(exports.resolveSymbol, mapped, target);
}
exports.resolve = resolve;
//# sourceMappingURL=resolve.js.map