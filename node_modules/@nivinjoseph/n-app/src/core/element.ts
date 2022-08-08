import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";

export const elementSymbol = Symbol.for("@nivinjoseph/n-app/element");

// public
export function element(elementName: string): Function
{
    given(elementName, "elementName").ensureHasValue().ensureIsString();

    return (target: Function) => Reflect.defineMetadata(elementSymbol, elementName, target);
}