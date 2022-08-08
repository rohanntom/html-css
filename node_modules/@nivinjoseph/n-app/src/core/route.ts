import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

export const appRouteSymbol = Symbol.for("@nivinjoseph/n-app/appRoute");

// public
export function route(route: string, redirect?: string): Function
{
    given(route, "route").ensureHasValue().ensureIsString()    
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'");
    
    given(redirect as string, "redirect").ensureIsString()    
        .ensure(t => t.isNotEmptyOrWhiteSpace(), "cannot be empty or whitespace")
        .ensure(t => t.trim().startsWith("/"), "has to begin with '/'")
        .ensure(t => t.trim().startsWith(route.trim()), "has to be a nested route") ;
    
    route = route.trim().replaceAll(" ", "");
    redirect = redirect?.trim().replaceAll(" ", "");

    return (target: Function) => Reflect.defineMetadata(appRouteSymbol, {route, redirect}, target);
}