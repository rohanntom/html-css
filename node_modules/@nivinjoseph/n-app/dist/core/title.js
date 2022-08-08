"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.title = exports.titleSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.titleSymbol = Symbol.for("@nivinjoseph/n-app/title");
// public
function title(title) {
    (0, n_defensive_1.given)(title, "title").ensureHasValue().ensureIsString();
    return (target) => Reflect.defineMetadata(exports.titleSymbol, title.trim(), target);
}
exports.title = title;
//# sourceMappingURL=title.js.map