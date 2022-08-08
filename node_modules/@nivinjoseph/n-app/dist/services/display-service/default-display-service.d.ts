import { DisplayService } from "./display-service";
import { DisplayType } from "./display-type";
import { Observable } from "@nivinjoseph/n-util";
export declare class DefaultDisplayService implements DisplayService {
    private readonly _windowResizeObserver;
    private _currentDisplayType;
    private _currentDisplayWidth;
    private _currentDisplayHeight;
    get currentDisplayType(): DisplayType;
    get currentDisplayWidth(): number;
    get currentDisplayHeight(): number;
    get windowResizeObservable(): Observable<void>;
    constructor();
    private _calculateCurrentDisplayType;
}
