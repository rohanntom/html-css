import { BaseViewModel } from "./base-view-model";
import "@nivinjoseph/n-ext";
import { MetaDetail } from "./meta";
export declare class PageViewModel extends BaseViewModel {
    protected get currentRoute(): string | null;
    protected get pathArgs(): Object | null;
    protected get queryArgs(): Object | null;
    static createComponentOptions(component: Function, defaultPageTitle: string | null, defaultPageMetadata: ReadonlyArray<MetaDetail> | null): object;
    protected onEnter(...params: Array<any>): void;
    protected onLeave(): void;
}
