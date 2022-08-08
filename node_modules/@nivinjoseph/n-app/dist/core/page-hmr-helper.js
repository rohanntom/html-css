"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHmrHelper = void 0;
const page_registration_1 = require("./page-registration");
const route_args_1 = require("./route-args");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class PageHmrHelper {
    /**
     * @static
     */
    constructor() { }
    static track(registration, routeArgs) {
        (0, n_defensive_1.given)(registration, "registration").ensureHasValue().ensureIsObject().ensureIsType(page_registration_1.PageRegistration);
        (0, n_defensive_1.given)(routeArgs, "routeArgs").ensureHasValue().ensureIsObject().ensureIsType(route_args_1.RouteArgs);
        this._infos.set(registration.name, { registration, routeArgs });
    }
    static restore(registration) {
        (0, n_defensive_1.given)(registration, "registration").ensureHasValue().ensureIsObject().ensureIsType(page_registration_1.PageRegistration)
            .ensure(t => this._infos.has(t.name));
        const info = this._infos.get(registration.name);
        registration.resolvedValues = info.registration.resolvedValues;
        return info.routeArgs;
    }
}
exports.PageHmrHelper = PageHmrHelper;
PageHmrHelper._infos = new Map();
//# sourceMappingURL=page-hmr-helper.js.map