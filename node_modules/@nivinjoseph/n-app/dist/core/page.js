"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_registration_1 = require("./page-registration");
// import { PageComponentFactory } from "./page-component-factory";
class Page {
    constructor(segment, parent) {
        this._parent = null;
        this._children = new Array();
        this._registration = null;
        (0, n_defensive_1.given)(segment, "segment").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        this._segment = segment;
        (0, n_defensive_1.given)(parent, "parent").ensureIsType(Page);
        if (parent)
            this.changeParent(parent);
    }
    get segment() { return this._segment; }
    get parent() { return this._parent; }
    get children() { return this._children.map(t => t); }
    get registration() { return this._registration; }
    attachRegistration(registration) {
        (0, n_defensive_1.given)(registration, "registration").ensureHasValue().ensureIsType(page_registration_1.PageRegistration);
        (0, n_defensive_1.given)(this, "this").ensure(t => t._registration == null, "already has registration");
        this._registration = registration;
    }
    addChild(childPage) {
        (0, n_defensive_1.given)(childPage, "childPage").ensureHasValue();
        this._children.push(childPage);
    }
    removeChild(childPage) {
        (0, n_defensive_1.given)(childPage, "childPage").ensureHasValue().ensureIsType(Page)
            .ensure(t => this._children.contains(t), "child not present");
        this._children.remove(childPage);
    }
    changeParent(parent) {
        if (this._parent)
            this._parent.removeChild(this);
        this._parent = parent;
        if (this._parent)
            this._parent.addChild(this);
    }
    createVueRouterRoute() {
        // let factory = new PageComponentFactory(container);
        // let factory = new PageComponentFactory();
        (0, n_defensive_1.given)(this, "this").ensure(t => t._registration != null, "no registration present");
        const vueRouterRoute = {
            name: this._registration.name.replace("ViewModel", ""),
            path: this._createRoute(),
            // component: factory.create(this._registration)
            component: this._registration.viewModel.___componentOptions
        };
        if (this._registration.redirect) {
            vueRouterRoute.redirect = (to) => {
                // we can do this because redirect has to be a nested route
                return to.path + this._registration.redirect.replace(this._registration.route.route, "");
            };
        }
        if (this._children.length > 0)
            vueRouterRoute.children = this._children.map(t => t.createVueRouterRoute());
        return vueRouterRoute;
    }
    _createRoute() {
        let route = this._registration.route.vueRoute;
        if (!this._parent)
            return route;
        route = route.replace(this._parent.registration.route.vueRoute, "");
        if (route.startsWith("/"))
            route = route.substr(1);
        return route;
    }
}
exports.Page = Page;
//# sourceMappingURL=page.js.map