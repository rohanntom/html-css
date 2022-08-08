"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteInfo = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
const n_exception_1 = require("@nivinjoseph/n-exception");
const route_param_1 = require("./route-param");
// route template format: /api/Product/{id:number}?{name?:string}&{all:boolean}
class RouteInfo {
    constructor(routeTemplate, isUrlGenerator = false) {
        this._routeParams = new Array();
        this._routeParamsRegistry = {};
        this._vueRoute = null;
        this._pathSegments = new Array();
        this._routeKey = null;
        this._hasQuery = false;
        (0, n_defensive_1.given)(routeTemplate, "routeTemplate")
            .ensureHasValue()
            .ensure(t => !t.isEmptyOrWhiteSpace());
        routeTemplate = routeTemplate.trim().replaceAll(" ", "");
        if (!isUrlGenerator) {
            (0, n_defensive_1.given)(routeTemplate, "routeTemplate")
                .ensure(t => t.startsWith("/"), "has to start with '/'")
                .ensure(t => !t.contains("//"), "cannot contain '//'");
            if (routeTemplate.length > 1 && routeTemplate.endsWith("/"))
                routeTemplate = routeTemplate.substr(0, routeTemplate.length - 1);
        }
        this._routeTemplate = routeTemplate;
        this._populateRouteParams();
        if (!isUrlGenerator) {
            this._vueRoute = this._generateVueRoute(this._routeTemplate);
            this._populatePathSegments();
            this._routeKey = this._generateRouteKey();
        }
    }
    get route() { return this._routeTemplate; }
    get vueRoute() {
        (0, n_defensive_1.given)(this, "this").ensure(t => t._vueRoute != null, "not available in UrlGenerator mode");
        return this._vueRoute;
    }
    get params() { return this._routeParams; }
    get pathSegments() { return this._pathSegments; }
    get routeKey() {
        (0, n_defensive_1.given)(this, "this").ensure(t => t._routeKey != null, "not available in UrlGenerator mode");
        return this._routeKey;
    }
    findRouteParam(key) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        return this._routeParamsRegistry[key.trim().toLowerCase()];
    }
    generateUrl(values) {
        (0, n_defensive_1.given)(values, "values").ensureHasValue().ensureIsObject();
        let url = this._routeTemplate;
        let hasQuery = this._hasQuery;
        for (const key in values) {
            const routeParam = this.findRouteParam(key);
            const val = values.getValue(key);
            if (routeParam) {
                const param = "{" + routeParam.param + "}";
                let replacement = routeParam.isQuery
                    ? "{0}={1}".format(key, encodeURIComponent(val))
                    : encodeURIComponent(val);
                if (val == null && routeParam.isQuery && routeParam.isOptional) // only query params can be optional anyway
                    replacement = "";
                url = url.replace(param, replacement);
            }
            else {
                if (val == null)
                    continue;
                url = `${url}${hasQuery ? "&" : "?"}${"{0}={1}".format(key, encodeURIComponent(val))}`;
                hasQuery = true;
            }
        }
        url = url.trim();
        while (url.endsWith("?") || url.endsWith("&"))
            url = url.substr(0, url.length - 1).trim();
        return url;
    }
    _populateRouteParams() {
        let index = 1;
        for (const routeParam of this._extractTemplateParams(this._routeTemplate).map(t => new route_param_1.RouteParam(t))) {
            const key = routeParam.paramKey.toLowerCase();
            if (this._routeParamsRegistry[key])
                throw new n_exception_1.ApplicationException("Invalid route template. Duplicate route params (case insensitive) detected.");
            routeParam.setOrder(index++);
            this._routeParamsRegistry[key] = routeParam;
            this._routeParams.push(routeParam);
        }
    }
    _extractTemplateParams(routeTemplate) {
        const templateParams = new Array();
        let queryFound = false;
        let startFound = false;
        let startIndex = 0;
        for (let i = 0; i < routeTemplate.length; i++) {
            if (routeTemplate[i] === "?" && !startFound) {
                if (queryFound)
                    throw new n_exception_1.ApplicationException("Invalid route template. Unresolvable '?' characters detected.");
                queryFound = true;
            }
            if (routeTemplate[i] === "{") {
                if (startFound)
                    throw new n_exception_1.ApplicationException("Invalid route template. Braces do not match.");
                startFound = true;
                startIndex = i + 1;
            }
            else if (routeTemplate[i] === "}") {
                if (!startFound)
                    throw new n_exception_1.ApplicationException("Invalid route template. Braces do not match.");
                let value = routeTemplate.substring(startIndex, i);
                value = value.trim();
                if (queryFound)
                    value = value + "[Q]";
                templateParams.push(value);
                startFound = false;
            }
        }
        this._hasQuery = queryFound;
        return templateParams;
    }
    _generateVueRoute(routeTemplate) {
        for (const routeParam of this._routeParams) {
            const asItWas = "{" + routeParam.param + "}";
            if (!routeTemplate.contains(asItWas))
                throw new n_exception_1.ApplicationException("Invalid route template.");
            routeTemplate = routeTemplate.replace(asItWas, ":{0}".format(routeParam.paramKey));
        }
        if (routeTemplate.contains("?")) {
            const splitted = routeTemplate.split("?");
            if (splitted.length > 2)
                throw new n_exception_1.ApplicationException("Invalid route template. Unresolvable '?' characters detected.");
            routeTemplate = splitted[0];
        }
        return routeTemplate;
    }
    _populatePathSegments() {
        const routeTemplate = this._vueRoute;
        const pathSegments = new Array();
        pathSegments.push("/");
        for (const item of routeTemplate.split("/")) {
            if (item.isEmptyOrWhiteSpace() || item.startsWith(":"))
                continue;
            if (pathSegments.some(t => t === item))
                throw new n_exception_1.ArgumentException("routeTemplate", "cannot contain duplicate segments");
            pathSegments.push(item);
        }
        this._pathSegments.push(...pathSegments);
    }
    _generateRouteKey() {
        return this._pathSegments.join("/").replace("//", "/");
    }
}
exports.RouteInfo = RouteInfo;
//# sourceMappingURL=route-info.js.map