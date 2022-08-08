"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NScrollContainerViewModel = void 0;
const tslib_1 = require("tslib");
require("simplebar/dist/simplebar.css");
const SimpleBar = require("simplebar");
const template_1 = require("../../core/template");
const element_1 = require("../../core/element");
const bind_1 = require("../../core/bind");
const component_view_model_1 = require("../../core/component-view-model");
require("./n-scroll-container-view.scss");
const n_util_1 = require("@nivinjoseph/n-util");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
let NScrollContainerViewModel = class NScrollContainerViewModel extends component_view_model_1.ComponentViewModel {
    constructor() {
        super(...arguments);
        this._sb = null;
    }
    get _hugBottom() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("hugBottom")); }
    get _hugRight() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("hugRight")); }
    get isHorizontalOnly() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("onlyX")); }
    get isVerticalOnly() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("onlyY")); }
    get myRenderKey() { var _a; return (_a = this.getBound("renderKey")) !== null && _a !== void 0 ? _a : 0; }
    onCreate() {
        (0, n_defensive_1.given)(this, "this").ensure(t => !(t.isHorizontalOnly === true && t.isVerticalOnly === true), "only-x and only-y cannot both be true");
        super.onCreate();
    }
    onMount(element) {
        super.onMount(element);
        const SimpleBarCtor = SimpleBar.default;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._sb = new SimpleBarCtor(element.querySelector(".simple-scroll-viewer-scroll-container"), { autoHide: true });
        this._calculateScroll();
        this.watch("myRenderKey", (v, ov) => {
            if (v == null || v === ov)
                return;
            this._sb.recalculate();
            setTimeout(() => {
                this._calculateScroll();
            }, 500);
        });
    }
    onDestroy() {
        if (this._sb != null) {
            // this._sb.unMount();
            this._sb = null;
        }
        this.unWatch("myRenderKey");
        super.onDestroy();
    }
    _calculateScroll() {
        if (this._sb == null)
            return;
        if (this._hugBottom) {
            const scrollElement = this._sb.getScrollElement();
            $(scrollElement).animate({ scrollTop: scrollElement.scrollHeight + "px" });
            // this._sb.getScrollElement().scrollTop = this._sb.getScrollElement().scrollHeight;
        }
        if (this._hugRight) {
            const scrollElement = this._sb.getScrollElement();
            $(scrollElement).animate({ scrollLeft: scrollElement.scrollWidth + "px" });
            // this._sb.getScrollElement().scrollLeft = this._sb.getScrollElement().scrollWidth;
        }
    }
};
NScrollContainerViewModel = tslib_1.__decorate([
    (0, template_1.template)(require("./n-scroll-container-view.html")),
    (0, element_1.element)("n-scroll-container"),
    (0, bind_1.bind)({
        "onlyX?": "boolean",
        "onlyY?": "boolean",
        "renderKey?": "number",
        "hugBottom?": "boolean",
        "hugRight?": "boolean"
    })
], NScrollContainerViewModel);
exports.NScrollContainerViewModel = NScrollContainerViewModel;
//# sourceMappingURL=n-scroll-container-view-model.js.map