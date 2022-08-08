"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.appRouteSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.appRouteSymbol = Symbol.for("@nivinjoseph/n-app/appRoute");
// public
function route(route, redirect) {
    (0, n_defensive_1.given)(route, "route").ensureHasValue().ensureIsString()
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'");
    (0, n_defensive_1.given)(redirect, "redirect").ensureIsString()
        .ensure(t => t.isNotEmptyOrWhiteSpace(), "cannot be empty or whitespace")
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'")
        .ensure(t => t.trim().startsWith(route.trim()), "has to be a nested route");
    route = route.trim().replaceAll(" ", "");
    redirect = redirect === null || redirect === void 0 ? void 0 : redirect.trim().replaceAll(" ", "");
    return (target) => Reflect.defineMetadata(exports.appRouteSymbol, { route, redirect }, target);
}
exports.route = route;
//# sourceMappingURL=route.js.map