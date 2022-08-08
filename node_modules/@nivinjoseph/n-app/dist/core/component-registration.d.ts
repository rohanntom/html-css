import { ViewModelRegistration } from "./view-model-registration";
export declare class ComponentRegistration extends ViewModelRegistration {
    private readonly _element;
    private readonly _bindings;
    private readonly _bindingSchema;
    private readonly _hasModel;
    private readonly _events;
    get element(): string;
    get bindings(): Array<ComponentBindingInfo>;
    get bindingSchema(): object;
    get hasModel(): boolean;
    get events(): Array<string>;
    constructor(component: Function);
}
export interface ComponentBindingInfo {
    name: string;
    isOptional: boolean;
    type: any;
}
