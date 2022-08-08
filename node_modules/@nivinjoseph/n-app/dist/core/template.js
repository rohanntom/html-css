"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = exports.templateSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.templateSymbol = Symbol.for("@nivinjoseph/n-app/template");
// public
function template(template) {
    (0, n_defensive_1.given)(template, "template").ensureHasValue();
    if (typeof template === "string")
        (0, n_defensive_1.given)(template, "template").ensureIsString();
    else
        (0, n_defensive_1.given)(template, "template").ensureIsObject();
    return (target) => Reflect.defineMetadata(exports.templateSymbol, template, target);
}
exports.template = template;
//# sourceMappingURL=template.js.map