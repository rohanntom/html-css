"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentViewModel = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const n_exception_1 = require("@nivinjoseph/n-exception");
const base_view_model_1 = require("./base-view-model");
const component_registration_1 = require("./component-registration");
const component_factory_1 = require("./component-factory");
// public
class ComponentViewModel extends base_view_model_1.BaseViewModel {
    get _myBindings() { return this["_bindings"]; }
    get _myEvents() { return this["_events"]; }
    static createComponentOptions(component) {
        (0, n_defensive_1.given)(component, "component").ensureHasValue().ensureIsFunction();
        const registration = new component_registration_1.ComponentRegistration(component);
        const factory = new component_factory_1.ComponentFactory();
        return factory.create(registration);
    }
    getBound(propertyName) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling getBound() in the constructor");
        (0, n_defensive_1.given)(propertyName, "propertyName").ensureHasValue()
            .ensure(t => this._myBindings.contains(t), `No binding with the name '${propertyName}' found`);
        return this.ctx[propertyName];
    }
    getBoundModel() {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling getBoundModel() in the constructor");
        if (!this._myBindings.contains("model"))
            throw new n_exception_1.InvalidOperationException("calling getBoundModel() without defining 'model' in bind");
        return this.ctx["value"];
    }
    setBoundModel(value) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (!this.ctx)
            throw new n_exception_1.InvalidOperationException("calling setBoundModel() in the constructor");
        if (!this._myBindings.contains("model"))
            throw new n_exception_1.InvalidOperationException("calling setBoundModel() without defining 'model' in bind");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.ctx.$emit("input", value);
    }
    emit(event, ...eventArgs) {
        (0, n_defensive_1.given)(event, "event").ensureHasValue().ensureIsString()
            .ensure(t => this._myEvents.contains(t.trim()), "undeclared event");
        event = this._camelCaseToKebabCase(event);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.ctx.$emit(event, ...eventArgs);
    }
    _camelCaseToKebabCase(value) {
        let eventName = value.trim();
        const re = /[A-Z]/g;
        let index = eventName.search(re);
        while (index !== -1) {
            const char = eventName[index];
            const replacement = "-" + char.toLowerCase();
            eventName = eventName.replace(char, replacement);
            index = eventName.search(re);
        }
        return eventName;
    }
}
exports.ComponentViewModel = ComponentViewModel;
//# sourceMappingURL=component-view-model.js.map