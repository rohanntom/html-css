import "reflect-metadata";
import { given } from "@nivinjoseph/n-defensive";
import "@nivinjoseph/n-ext";


export const metaSymbol = Symbol.for("@nivinjoseph/n-app/meta");

// public
export type MetaDetail = { $key: string; } & { [index: string]: string; };

// public
export function meta(...metas: ReadonlyArray<MetaDetail>): Function
{
    given(metas, "metas").ensureHasValue().ensureIsArray()
        .ensure(t => t.isNotEmpty);

    return (target: Function) => Reflect.defineMetadata(metaSymbol, metas, target);
}