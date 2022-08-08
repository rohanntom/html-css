import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import { ComponentViewModel } from "./component-view-model";


export const componentsSymbol = Symbol.for("@nivinjoseph/n-app/components");

// public
export function components(...components: Array<new (...params: Array<any>) => ComponentViewModel>): Function
{
    given(components, "components").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty, "cannot be empty");

    return (target: Function) => Reflect.defineMetadata(componentsSymbol, components, target);
}