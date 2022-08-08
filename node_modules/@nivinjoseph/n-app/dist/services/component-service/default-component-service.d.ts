import { ComponentService } from "./component-service";
import { ViewModelRegistration } from "../../core/view-model-registration";
import { ComponentOptions } from "./component-options";
export declare class DefaultComponentService implements ComponentService {
    compile(componentViewModelClass: Function, cache?: boolean): ComponentOptions;
    create(registration: ViewModelRegistration, cache: boolean): ComponentOptions;
}
