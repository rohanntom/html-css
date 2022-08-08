import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import { PageViewModel } from "./page-view-model";
import { ClassHierarchy } from "@nivinjoseph/n-util";


export const pagesSymbol = Symbol.for("@nivinjoseph/n-app/pages");

// public
export function pages(...pages: ReadonlyArray<ClassHierarchy<PageViewModel>>): Function
{
    given(pages, "pages").ensureHasValue().ensureIsArray().ensure(t => t.isNotEmpty);

    return (target: Function) => Reflect.defineMetadata(pagesSymbol, pages, target);
}