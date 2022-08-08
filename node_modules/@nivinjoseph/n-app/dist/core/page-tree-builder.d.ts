import { Page } from "./page";
import { PageRegistration } from "./page-registration";
export declare class PageTreeBuilder {
    private readonly _root;
    private readonly _registrations;
    constructor(root: Page, pageRegistrations: ReadonlyArray<PageRegistration>);
    build(): ReadonlyArray<Page>;
    private _buildTree;
    private _shakeTree;
}
