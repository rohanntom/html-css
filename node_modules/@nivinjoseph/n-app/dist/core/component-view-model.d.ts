import { BaseViewModel } from "./base-view-model";
export declare abstract class ComponentViewModel extends BaseViewModel {
    private get _myBindings();
    private get _myEvents();
    static createComponentOptions(component: Function): object;
    protected getBound<T>(propertyName: string): T;
    protected getBoundModel<T>(): T;
    protected setBoundModel(value: unknown): void;
    protected emit(event: string, ...eventArgs: Array<any>): void;
    private _camelCaseToKebabCase;
}
