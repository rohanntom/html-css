import { ComponentOptions } from "./component-options";
export interface ComponentService {
    compile(componentViewModelClass: Function, cache?: boolean): ComponentOptions;
}
