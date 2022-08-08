"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NExpandingContainerViewModel = void 0;
const tslib_1 = require("tslib");
const template_1 = require("../../core/template");
const element_1 = require("../../core/element");
const bind_1 = require("../../core/bind");
const component_view_model_1 = require("../../core/component-view-model");
const n_util_1 = require("@nivinjoseph/n-util");
require("./n-expanding-container-view.scss");
let NExpandingContainerViewModel = class NExpandingContainerViewModel extends component_view_model_1.ComponentViewModel {
    get _constrainHorizontal() { return !!n_util_1.TypeHelper.parseBoolean(this.getBound("constrainX")); }
    get myRenderKey() { var _a; return (_a = this.getBound("renderKey")) !== null && _a !== void 0 ? _a : 0; }
    onMount(element) {
        super.onMount(element);
        this._recalculate(element);
        this.watch("myRenderKey", (v, ov) => {
            if (v == null || v === ov)
                return;
            this._recalculate(element);
        });
    }
    onDestroy() {
        this.unWatch("myRenderKey");
        super.onDestroy();
    }
    _recalculate(element) {
        if (this._constrainHorizontal)
            this._doHorizontal(element);
        this._doVertical(element);
    }
    _doHorizontal(element) {
        let constrainedWidth = 0;
        $(element).siblings().each(function () {
            var _a;
            const width = (_a = $(this).outerWidth(true)) !== null && _a !== void 0 ? _a : 0;
            constrainedWidth += width;
        });
        $(element).width(`calc(100% - ${constrainedWidth}px)`);
    }
    _doVertical(element) {
        let constrainedHeight = 0;
        $(element).siblings().each(function () {
            var _a;
            const height = (_a = $(this).outerHeight(true)) !== null && _a !== void 0 ? _a : 0;
            constrainedHeight += height;
        });
        $(element).height(`calc(100% - ${constrainedHeight}px)`);
    }
};
NExpandingContainerViewModel = tslib_1.__decorate([
    (0, template_1.template)(require("./n-expanding-container-view.html")),
    (0, element_1.element)("n-expanding-container"),
    (0, bind_1.bind)({
        "constrainX?": "boolean",
        "renderKey?": "number"
    })
], NExpandingContainerViewModel);
exports.NExpandingContainerViewModel = NExpandingContainerViewModel;
//# sourceMappingURL=n-expanding-container-view-model.js.map