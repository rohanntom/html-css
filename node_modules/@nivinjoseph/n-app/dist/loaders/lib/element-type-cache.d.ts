import { LoaderContext } from "webpack";
export declare type ElementTypeInfo = {
    attrsSchema: string;
    hasRequiredAttrs: boolean;
    modelSchema: string;
    hasModel: boolean;
    eventsSchema: string;
    filePath: string;
};
export declare let globalComponentElementTypeCache: Map<string, ElementTypeInfo> | null;
export declare function populateGlobalElementTypeCache(context: LoaderContext<any>): void;
