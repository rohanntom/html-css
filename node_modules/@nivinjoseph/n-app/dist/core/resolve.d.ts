import "reflect-metadata";
import { NavRoute } from "./nav-route";
export declare const resolveSymbol: unique symbol;
export declare function resolve(...resolvers: ReadonlyArray<Function>): Function;
export interface Resolution {
    redirect?: string;
    value?: any;
}
export interface Resolver {
    resolve(from: NavRoute, to: NavRoute): Promise<Resolution>;
}
