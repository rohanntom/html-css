import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const titleSymbol = Symbol.for("@nivinjoseph/n-app/title");

// public
export function title(title: string): Function
{
    given(title, "title").ensureHasValue().ensureIsString();

    return (target: Function) => Reflect.defineMetadata(titleSymbol, title.trim(), target);
}