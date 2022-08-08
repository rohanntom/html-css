import "reflect-metadata";
import "@nivinjoseph/n-ext";
export declare const metaSymbol: unique symbol;
export declare type MetaDetail = {
    $key: string;
} & {
    [index: string]: string;
};
export declare function meta(...metas: ReadonlyArray<MetaDetail>): Function;
