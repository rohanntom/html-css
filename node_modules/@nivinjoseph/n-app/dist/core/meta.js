"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.meta = exports.metaSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.metaSymbol = Symbol.for("@nivinjoseph/n-app/meta");
// public
function meta(...metas) {
    (0, n_defensive_1.given)(metas, "metas").ensureHasValue().ensureIsArray()
        .ensure(t => t.isNotEmpty);
    return (target) => Reflect.defineMetadata(exports.metaSymbol, metas, target);
}
exports.meta = meta;
//# sourceMappingURL=meta.js.map