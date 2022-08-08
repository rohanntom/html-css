"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageManager = void 0;
const tslib_1 = require("tslib");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const page_registration_1 = require("./page-registration");
const n_exception_1 = require("@nivinjoseph/n-exception");
const page_1 = require("./page");
const page_tree_builder_1 = require("./page-tree-builder");
class PageManager {
    constructor(vueRouter, container, componentManager) {
        this._pageViewModelClasses = new Array();
        this._registrations = new Array();
        this._resolvers = new Array();
        this._vueRouterInstance = null;
        this._initialRoute = null;
        this._unknownRoute = null;
        // private _defaultPageTitle: string | null = null;
        // private _defaultPageMetas: ReadonlyArray<MetaDetail> = null;
        this._useHistoryMode = false;
        (0, n_defensive_1.given)(vueRouter, "vueRouter").ensureHasValue();
        this._vueRouter = vueRouter;
        (0, n_defensive_1.given)(container, "container").ensureHasValue().ensureIsObject();
        this._container = container;
        (0, n_defensive_1.given)(componentManager, "componentManager").ensureHasValue().ensureIsObject();
        this._componentManager = componentManager;
    }
    get hasRegistrations() { return this._registrations.isNotEmpty; }
    get useHistoryMode() { return this._useHistoryMode; }
    get vueRouterInstance() {
        (0, n_defensive_1.given)(this, "this").ensure(t => t._vueRouterInstance != null, "not bootstrapped");
        return this._vueRouterInstance;
    }
    registerPages(...pageViewModelClasses) {
        this._pageViewModelClasses.push(...pageViewModelClasses);
    }
    useAsInitialRoute(route) {
        (0, n_defensive_1.given)(route, "route").ensureHasValue().ensureIsString();
        this._initialRoute = route.trim();
    }
    useAsUnknownRoute(route) {
        (0, n_defensive_1.given)(route, "route").ensureHasValue().ensureIsString();
        this._unknownRoute = route.trim();
    }
    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageTitle(title: string): void
    // {
    //     given(title, "title").ensureHasValue().ensureIsString();
    //     this._defaultPageTitle = title.trim();
    // }
    // /**
    //  * @deprecated
    //  */
    // public useAsDefaultPageMetadata(metas: ReadonlyArray<{ name: string; content: string; }>): void
    // {
    //     given(metas, "metas").ensureHasValue().ensureIsArray().ensure(t => t.length > 0);
    //     this._defaultPageMetas = [...metas];
    // }
    useHistoryModeRouting() {
        this._useHistoryMode = true;
    }
    bootstrap() {
        this._pageViewModelClasses.forEach(t => this._registerPage(t));
        if (this._registrations.length === 0)
            return;
        this._createRouting();
        this._configureResolves();
        // this.configureInitialRoute();
    }
    _registerPage(pageViewModelClass) {
        // const registration = new PageRegistration(pageViewModelClass, this._defaultPageTitle, this._defaultPageMetas);
        const registration = new page_registration_1.PageRegistration(pageViewModelClass, null, null);
        if (this._registrations.some(t => t.name === registration.name))
            throw new n_exception_1.ApplicationException(`Duplicate Page registration with name '${registration.name}'.`);
        if (this._registrations.some(t => t.route.routeKey === registration.route.routeKey))
            throw new n_exception_1.ApplicationException(`Route conflict detected for Page registration with name '${registration.name}'`);
        this._registrations.push(registration);
        if (registration.persist)
            this._container.registerSingleton(registration.name, registration.viewModel);
        else
            this._container.registerTransient(registration.name, registration.viewModel);
        if (registration.resolvers && registration.resolvers.isNotEmpty)
            registration.resolvers.forEach(t => {
                if (this._resolvers.contains(t.name))
                    return;
                this._container.registerTransient(t.name, t.value);
                this._resolvers.push(t.name);
            });
        if (registration.components && registration.components.isNotEmpty)
            this._componentManager.registerComponents(...registration.components);
        if (registration.pages && registration.pages.isNotEmpty)
            registration.pages.forEach(t => this._registerPage(t));
    }
    _createRouting() {
        const pageTree = this._createPageTree();
        const vueRouterRoutes = pageTree.map(t => t.createVueRouterRoute());
        if (this._initialRoute)
            vueRouterRoutes.push({ path: "/", redirect: this._initialRoute });
        if (this._unknownRoute)
            vueRouterRoutes.push({ path: "*", redirect: this._unknownRoute });
        const vueRouter = this._vueRouter;
        const routerOptions = {
            routes: vueRouterRoutes,
            scrollBehavior: function (_to, _from, _savedPosition) {
                return { x: 0, y: 0 };
            }
        };
        if (this._useHistoryMode)
            routerOptions.mode = "history";
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._vueRouterInstance = new vueRouter(routerOptions);
    }
    _createPageTree() {
        const root = new page_1.Page("/", null);
        const treeBuilder = new page_tree_builder_1.PageTreeBuilder(root, this._registrations);
        return treeBuilder.build();
    }
    _configureResolves() {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._vueRouterInstance.beforeEach((to, from, next) => {
            const registrationName = to.name + "ViewModel";
            const registration = this._registrations.find(t => t.name === registrationName);
            if (registration == null)
                throw new n_exception_1.ApplicationException(`Unable to find PageRegistration with name '${registrationName}'`);
            registration.resolvedValues = null;
            if (registration.resolvers && registration.resolvers.length > 0) {
                const resolvers = registration.resolvers.map(t => this._container.resolve(t.name));
                resolvers
                    .mapAsync((t) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    try {
                        const resolution = yield t.resolve(from, to);
                        return resolution;
                    }
                    catch (error) {
                        return false;
                    }
                }))
                    .then(resolutions => {
                    if (resolutions.some(t => t === false)) {
                        next(false);
                        return;
                    }
                    const redirectRes = resolutions.find(t => !!t.redirect);
                    if (redirectRes && redirectRes.redirect) {
                        next(redirectRes.redirect);
                        return;
                    }
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    registration.resolvedValues = resolutions.filter(t => t.value != null).map(t => t.value);
                    next();
                })
                    .catch(() => {
                    next(false);
                });
            }
            else {
                next();
            }
        });
    }
}
exports.PageManager = PageManager;
//# sourceMappingURL=page-manager.js.map