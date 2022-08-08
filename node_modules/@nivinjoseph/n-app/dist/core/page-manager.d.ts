import { Container } from "@nivinjoseph/n-ject";
import { ComponentManager } from "./component-manager";
import VueRouter from "vue-router";
export declare class PageManager {
    private readonly _vueRouter;
    private readonly _container;
    private readonly _componentManager;
    private readonly _pageViewModelClasses;
    private readonly _registrations;
    private readonly _resolvers;
    private _vueRouterInstance;
    private _initialRoute;
    private _unknownRoute;
    private _useHistoryMode;
    get hasRegistrations(): boolean;
    get useHistoryMode(): boolean;
    get vueRouterInstance(): VueRouter;
    constructor(vueRouter: unknown, container: Container, componentManager: ComponentManager);
    registerPages(...pageViewModelClasses: Array<Function>): void;
    useAsInitialRoute(route: string): void;
    useAsUnknownRoute(route: string): void;
    useHistoryModeRouting(): void;
    bootstrap(): void;
    private _registerPage;
    private _createRouting;
    private _createPageTree;
    private _configureResolves;
}
