"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentRegistration = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const view_model_registration_1 = require("./view-model-registration");
const element_1 = require("./element");
const n_exception_1 = require("@nivinjoseph/n-exception");
const bind_1 = require("./bind");
const events_1 = require("./events");
const utilities_1 = require("./utilities");
class ComponentRegistration extends view_model_registration_1.ViewModelRegistration {
    constructor(component) {
        (0, n_defensive_1.given)(component, "component").ensureHasValue();
        super(component);
        this._bindings = new Array();
        this._bindingSchema = {};
        this._events = new Array();
        if (!Reflect.hasOwnMetadata(element_1.elementSymbol, this.viewModel))
            throw new n_exception_1.ApplicationException(`ComponentViewModel '${this.name}' does not have @element applied.`);
        this._element = Reflect.getOwnMetadata(element_1.elementSymbol, this.viewModel);
        if (Reflect.hasOwnMetadata(bind_1.bindSymbol, this.viewModel)) {
            const bindingSchema = Reflect.getOwnMetadata(bind_1.bindSymbol, this.viewModel);
            Object.keys(bindingSchema).forEach(key => {
                let name = key.trim();
                let isOptional = false;
                if (name.endsWith("?")) {
                    name = name.substring(0, name.length - 1);
                    isOptional = true;
                }
                this._bindings.push({
                    name,
                    isOptional,
                    type: bindingSchema[key]
                });
            });
            const forbidden = [...utilities_1.Utilities.forbidden, "value"];
            (0, n_defensive_1.given)(this._bindings, "bindings")
                .ensure(t => t.length === t.distinct(u => u.name).length, `duplicate binding declarations detected in ${this.name} binding schema`)
                .ensure(t => t.some(u => u.name === "model") ? !t.find(u => u.name === "model").isOptional : true, "model cannot be declared as optional")
                // .ensure(t => t.every(u => u.name !== "value"), "using forbidden keyword 'value' in binding schema")
                .ensure(t => t.every(u => !forbidden.contains(u.name)), `using forbidden keyword in binding schema, the following names are forbidden: ${forbidden}.`);
            this._bindingSchema = bindingSchema;
        }
        this._hasModel = this._bindings.some(t => t.name === "model");
        if (Reflect.hasOwnMetadata(events_1.eventsSymbol, this.viewModel))
            this._events.push(...Reflect.getOwnMetadata(events_1.eventsSymbol, this.viewModel));
    }
    get element() { return this._element; }
    get bindings() { return this._bindings; }
    get bindingSchema() { return this._bindingSchema; }
    get hasModel() { return this._hasModel; }
    get events() { return this._events; }
}
exports.ComponentRegistration = ComponentRegistration;
//# sourceMappingURL=component-registration.js.map