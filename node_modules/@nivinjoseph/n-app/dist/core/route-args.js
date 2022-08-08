"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteArgs = void 0;
const http_exception_1 = require("./http-exception");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
class RouteArgs {
    constructor(pathArgs, queryArgs, routeArgs) {
        (0, n_defensive_1.given)(pathArgs, "pathArgs").ensureHasValue().ensureIsObject();
        (0, n_defensive_1.given)(queryArgs, "queryArgs").ensureHasValue().ensureIsObject();
        (0, n_defensive_1.given)(routeArgs, "routeArgs").ensureHasValue().ensureIsArray();
        this._pathArgs = pathArgs;
        this._queryArgs = queryArgs;
        this._routeArgs = routeArgs;
    }
    get pathArgs() { return this._pathArgs; }
    get queryArgs() { return this._queryArgs; }
    get routeArgs() { return this._routeArgs; }
    static create(route, ctx) {
        // console.log("ctx", ctx);
        const queryArgs = Object.assign({}, ctx.query);
        const pathArgs = Object.assign({}, ctx.params);
        const model = {};
        for (const key in queryArgs) {
            const routeParam = route.findRouteParam(key);
            if (routeParam) {
                const parsed = routeParam.parseParam(queryArgs[key]);
                model[routeParam.paramKey] = parsed;
                queryArgs[key] = parsed;
            }
            else {
                const value = queryArgs[key];
                if (value == null || typeof value !== "string" || value.isEmptyOrWhiteSpace() || value.trim().toLowerCase() === "null")
                    queryArgs[key] = null;
            }
        }
        for (const key in pathArgs) {
            const routeParam = route.findRouteParam(key);
            // if (!routeParam)
            //     throw new HttpException(404);
            // instead we just skip it. This is because keys in pathParams will include parent page route pathParams
            if (!routeParam)
                continue;
            const parsed = routeParam.parseParam(pathArgs[key]);
            model[routeParam.paramKey] = parsed;
            pathArgs[key] = parsed;
        }
        const routeArgs = [];
        for (const routeParam of route.params) {
            let value = model[routeParam.paramKey];
            if (value === undefined || value === null) {
                if (!routeParam.isOptional)
                    throw new http_exception_1.HttpException(404);
                value = null;
            }
            routeArgs.push(value);
        }
        return new RouteArgs(pathArgs, queryArgs, routeArgs);
    }
    equals(comparison) {
        (0, n_defensive_1.given)(comparison, "comparison").ensureHasValue().ensureIsType(RouteArgs);
        const current = this._createParamsArray(this);
        const compare = this._createParamsArray(comparison);
        return current.equals(compare);
    }
    _createParamsArray(routeArgs) {
        const obj = Object.assign({}, routeArgs._pathArgs, routeArgs._queryArgs);
        const params = new Array();
        for (const key in obj)
            params.push([key, obj.getValue(key)]);
        return params.orderBy(t => t[0]);
    }
}
exports.RouteArgs = RouteArgs;
//# sourceMappingURL=route-args.js.map