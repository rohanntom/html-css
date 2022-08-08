import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const templateSymbol = Symbol.for("@nivinjoseph/n-app/template");

// public
export function template(template: string | object): Function
{
    given(template, "template").ensureHasValue();
    
    if (typeof template === "string")
        given(template, "template").ensureIsString();
    else
        given(template, "template").ensureIsObject();

    return (target: Function) => Reflect.defineMetadata(templateSymbol, template, target);
}

