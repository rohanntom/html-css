import { RouteArgs } from "./route-args";
import { BaseViewModel } from "./base-view-model";
import "@nivinjoseph/n-ext";
import { given } from "@nivinjoseph/n-defensive";
import { PageRegistration } from "./page-registration";
import { PageComponentFactory } from "./page-component-factory";
import { MetaDetail } from "./meta";


// public
export class PageViewModel extends BaseViewModel
{
    protected get currentRoute(): string | null
    {
        let route: string | null = this.ctx.$route ? this.ctx.$route.fullPath : null;
        route = route ? route.trim() : null;
        if (route)
        {
            while (route.endsWith("/") || route.endsWith("?"))
                route = route.substr(0, route.length - 1).trimRight();
        }
        return route;   
    }
    
    protected get pathArgs(): Object | null
    {
        const routeArgs: RouteArgs | null = (<any>this).__routeArgs;
        return routeArgs ? routeArgs.pathArgs : null;
    }
    
    protected get queryArgs(): Object | null
    { 
        const routeArgs: RouteArgs | null = (<any>this).__routeArgs;
        return routeArgs ? routeArgs.queryArgs : null;
    }
    
    public static createComponentOptions(component: Function, defaultPageTitle: string | null, defaultPageMetadata: ReadonlyArray<MetaDetail> | null): object
    {
        given(component, "component").ensureHasValue().ensureIsFunction();
        given(defaultPageTitle as string, "defaultPageTitle").ensureIsString();
        given(defaultPageMetadata as Array<MetaDetail>, "defaultPageMetadata").ensureIsArray();

        const registration = new PageRegistration(component, defaultPageTitle, defaultPageMetadata);
        const factory = new PageComponentFactory();
        return factory.create(registration);
    }
    
    // override
    protected onEnter(...params: Array<any>): void
    { 
        given(params, "params").ensureHasValue().ensureIsArray();
    }
    
    // override
    protected onLeave(): void
    { 
        // deliberately empty
    }
}