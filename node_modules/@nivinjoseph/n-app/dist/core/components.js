"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.components = exports.componentsSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
exports.componentsSymbol = Symbol.for("@nivinjoseph/n-app/components");
// public
function components(...components) {
    (0, n_defensive_1.given)(components, "components").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty, "cannot be empty");
    return (target) => Reflect.defineMetadata(exports.componentsSymbol, components, target);
}
exports.components = components;
//# sourceMappingURL=components.js.map