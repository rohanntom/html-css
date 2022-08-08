import "reflect-metadata";
import { ComponentViewModel } from "./component-view-model";
export declare const componentsSymbol: unique symbol;
export declare function components(...components: Array<new (...params: Array<any>) => ComponentViewModel>): Function;
