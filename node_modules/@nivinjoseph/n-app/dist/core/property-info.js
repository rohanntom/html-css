"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PropertyInfo = void 0;
class PropertyInfo {
    constructor(name, descriptor) {
        this._name = name;
        this._descriptor = descriptor;
    }
    get name() { return this._name; }
    get descriptor() { return this._descriptor; }
}
exports.PropertyInfo = PropertyInfo;
//# sourceMappingURL=property-info.js.map