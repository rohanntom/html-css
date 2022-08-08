import { ComponentViewModel } from "../../core/component-view-model";
import "./n-expanding-container-view.scss";
export declare class NExpandingContainerViewModel extends ComponentViewModel {
    get _constrainHorizontal(): boolean;
    get myRenderKey(): number;
    protected onMount(element: HTMLElement): void;
    protected onDestroy(): void;
    private _recalculate;
    private _doHorizontal;
    private _doVertical;
}
