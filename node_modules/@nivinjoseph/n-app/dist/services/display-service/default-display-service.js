"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultDisplayService = void 0;
const display_type_1 = require("./display-type");
// import * as $ from "jquery";
const n_util_1 = require("@nivinjoseph/n-util");
class DefaultDisplayService {
    constructor() {
        this._windowResizeObserver = new n_util_1.Observer("windowResized");
        this._calculateCurrentDisplayType();
        $(window).on("resize", () => {
            this._calculateCurrentDisplayType();
            this._windowResizeObserver.notify();
        });
    }
    get currentDisplayType() { return this._currentDisplayType; }
    get currentDisplayWidth() { return this._currentDisplayWidth; }
    get currentDisplayHeight() { return this._currentDisplayHeight; }
    get windowResizeObservable() { return this._windowResizeObserver; }
    _calculateCurrentDisplayType() {
        const displayHeight = $(window).height();
        if (this._currentDisplayHeight !== displayHeight)
            this._currentDisplayHeight = displayHeight;
        const displayWidth = $(window).width();
        if (this._currentDisplayWidth !== displayWidth)
            this._currentDisplayWidth = displayWidth;
        let displayType = display_type_1.DisplayType.desktop;
        if (displayWidth < 1024)
            displayType = display_type_1.DisplayType.tablet;
        if (displayWidth < 769)
            displayType = display_type_1.DisplayType.phone;
        this._currentDisplayType = displayType;
    }
}
exports.DefaultDisplayService = DefaultDisplayService;
//# sourceMappingURL=default-display-service.js.map