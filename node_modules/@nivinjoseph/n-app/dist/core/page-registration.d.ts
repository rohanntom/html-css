import { ViewModelRegistration } from "./view-model-registration";
import { RouteInfo } from "./route-info";
import { MetaDetail } from "./meta";
export declare class PageRegistration extends ViewModelRegistration {
    private readonly _route;
    private readonly _redirect;
    private readonly _title;
    private readonly _metadata;
    private readonly _resolvers;
    private readonly _pages;
    private _resolvedValues;
    get route(): RouteInfo;
    get redirect(): string | null;
    get title(): string | null;
    get metadata(): ReadonlyArray<MetaDetail>;
    get resolvers(): ReadonlyArray<any> | null;
    get pages(): ReadonlyArray<Function> | null;
    get resolvedValues(): ReadonlyArray<any> | null;
    set resolvedValues(value: ReadonlyArray<any> | null);
    constructor(page: Function, defaultPageTitle: string | null, defaultPageMetas: ReadonlyArray<MetaDetail> | null);
}
