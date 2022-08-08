"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pages = exports.pagesSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
exports.pagesSymbol = Symbol.for("@nivinjoseph/n-app/pages");
// public
function pages(...pages) {
    (0, n_defensive_1.given)(pages, "pages").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty);
    return (target) => Reflect.defineMetadata(exports.pagesSymbol, pages, target);
}
exports.pages = pages;
//# sourceMappingURL=pages.js.map