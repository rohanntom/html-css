import "reflect-metadata";
import { given, TypeStructure } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const bindSymbol = Symbol.for("@nivinjoseph/n-app/bind");

// public
export function bind(schema: TypeStructure): Function
{
    given(schema, "schema").ensureHasValue().ensureIsObject();

    return (target: Function) => Reflect.defineMetadata(bindSymbol, schema, target);
}