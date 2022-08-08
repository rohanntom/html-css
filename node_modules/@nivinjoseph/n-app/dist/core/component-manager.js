"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComponentManager = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
const component_registration_1 = require("./component-registration");
const n_exception_1 = require("@nivinjoseph/n-exception");
// import { ComponentFactory } from "./component-factory";
class ComponentManager {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(vue, container) {
        this._registrations = new Array();
        (0, n_defensive_1.given)(vue, "vue").ensureHasValue();
        (0, n_defensive_1.given)(container, "container").ensureHasValue();
        this._vue = vue;
        this._container = container;
    }
    registerComponents(...componentViewModelClasses) {
        for (const item of componentViewModelClasses)
            this._registerComponent(item);
    }
    bootstrap() {
        // let componentFactory = new ComponentFactory();
        this._registrations.forEach(registration => {
            // this._vue.component(registration.element, componentFactory.create(registration));
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call
            this._vue.component(registration.element, registration.viewModel.___componentOptions);
        });
    }
    _registerComponent(componentViewModelClass) {
        const registration = new component_registration_1.ComponentRegistration(componentViewModelClass);
        if (this._registrations.some(t => t.name === registration.name))
            throw new n_exception_1.ApplicationException(`Duplicate Component registration with name '${registration.name}'.`);
        if (this._registrations.some(t => t.element === registration.element))
            throw new n_exception_1.ApplicationException(`Duplicate Component registration with element '${registration.element}'`);
        this._registrations.push(registration);
        if (registration.persist)
            this._container.registerSingleton(registration.name, registration.viewModel);
        else
            this._container.registerTransient(registration.name, registration.viewModel);
        if (registration.components != null && registration.components.isNotEmpty)
            this.registerComponents(...registration.components);
    }
}
exports.ComponentManager = ComponentManager;
//# sourceMappingURL=component-manager.js.map