import { NavigationService } from "./navigation-service";
import "@nivinjoseph/n-ext";
import VueRouter from "vue-router";
export declare class DefaultNavigationService implements NavigationService {
    private readonly _vueRouter;
    get currentRoutePath(): string;
    get currentRouteFullPath(): string;
    get currentRouteHash(): string | null;
    constructor(vueRouter: VueRouter);
    navigate(route: string, params?: object | null, replaceHistory?: boolean): void;
    navigateBack(): void;
    navigateForward(): void;
    navigateSiteSameTab(url: string, replaceHistory?: boolean): void;
    navigateSiteNewTab(url: string): void;
    navigateSitePostSameTab(url: string, value: object): void;
    navigateSitePostNewTab(url: string, value: object): void;
    getSiteQueryParam(key: string): string;
    private _createForm;
    private _getHash;
}
