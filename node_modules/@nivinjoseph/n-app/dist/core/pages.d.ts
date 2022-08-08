import "reflect-metadata";
import { PageViewModel } from "./page-view-model";
import { ClassHierarchy } from "@nivinjoseph/n-util";
export declare const pagesSymbol: unique symbol;
export declare function pages(...pages: ReadonlyArray<ClassHierarchy<PageViewModel>>): Function;
