import { PageRegistration } from "./page-registration";
import { RouteArgs } from "./route-args";
import { given } from "@nivinjoseph/n-defensive";


export class PageHmrHelper
{
    private static readonly _infos = new Map<string, Info>();
    
    
    /**
     * @static
     */
    private constructor() { }
    
    
    public static track(registration: PageRegistration, routeArgs: RouteArgs): void
    {
        given(registration, "registration").ensureHasValue().ensureIsObject().ensureIsType(PageRegistration);
        given(routeArgs, "routeArgs").ensureHasValue().ensureIsObject().ensureIsType(RouteArgs);
        
        this._infos.set(registration.name, { registration, routeArgs });
    }
    
    public static restore(registration: PageRegistration): RouteArgs
    {
        given(registration, "registration").ensureHasValue().ensureIsObject().ensureIsType(PageRegistration)
            .ensure(t => this._infos.has(t.name));
     
        const info = this._infos.get(registration.name)!;
        
        registration.resolvedValues = info.registration.resolvedValues;
        return info.routeArgs;
    }
}


interface Info
{
    registration: PageRegistration;
    routeArgs: RouteArgs;
}