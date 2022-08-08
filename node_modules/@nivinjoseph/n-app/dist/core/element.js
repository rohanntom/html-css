"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.element = exports.elementSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.elementSymbol = Symbol.for("@nivinjoseph/n-app/element");
// public
function element(elementName) {
    (0, n_defensive_1.given)(elementName, "elementName").ensureHasValue().ensureIsString();
    return (target) => Reflect.defineMetadata(exports.elementSymbol, elementName, target);
}
exports.element = element;
//# sourceMappingURL=element.js.map