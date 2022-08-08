"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseViewModel = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
class BaseViewModel {
    constructor() {
        this._watches = {};
        this._executeOnCreate = null;
        this._executeOnDestroy = null;
    }
    get domElement() { return this._domElement; }
    get ctx() { return this["_ctx"]; }
    /** Override */
    onCreate() {
        if (this._executeOnCreate)
            this._executeOnCreate();
    }
    /** Override */
    onMount(element) {
        (0, n_defensive_1.given)(element, "element").ensureHasValue().ensureIsObject();
        this._domElement = element;
    }
    /** Override */
    onDismount() {
        // deliberate empty
    }
    /** Override */
    onDestroy() {
        for (const key in this._watches) {
            if (this._watches[key]) {
                this._watches[key](); // FIXME: why are we 
                this._watches[key] = undefined;
            }
        }
        if (this._executeOnDestroy)
            this._executeOnDestroy();
    }
    executeOnCreate(funcToExecute) {
        (0, n_defensive_1.given)(funcToExecute, "funcToExecute").ensureHasValue();
        this._executeOnCreate = funcToExecute;
    }
    executeOnDestroy(funcToExecute) {
        (0, n_defensive_1.given)(funcToExecute, "funcToExecute").ensureHasValue();
        this._executeOnDestroy = funcToExecute;
    }
    watch(propertyName, callback) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        (0, n_defensive_1.given)(this, "this").ensure(t => t.ctx != null, "cannot invoke in the constructor");
        (0, n_defensive_1.given)(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        propertyName = propertyName.trim();
        if (this._watches[propertyName])
            throw new n_exception_1.ApplicationException(`Watch already defined for property '${propertyName}'.`);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this._watches[propertyName] = this.ctx.$watch(propertyName, function (newVal, oldVal) {
            callback(newVal, oldVal);
        }, { deep: true });
    }
    unWatch(propertyName) {
        (0, n_defensive_1.given)(propertyName, "propertyName").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        propertyName = propertyName.trim();
        if (this._watches[propertyName]) {
            this._watches[propertyName]();
            this._watches[propertyName] = undefined;
        }
    }
}
exports.BaseViewModel = BaseViewModel;
//# sourceMappingURL=base-view-model.js.map