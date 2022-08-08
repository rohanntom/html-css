"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultStorageService = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class DefaultStorageService {
    persist(key, value) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        key = key.trim();
        if (value == null) {
            localStorage.setItem(key, null);
            return;
        }
        const storeValue = { item: value };
        localStorage.setItem(key, JSON.stringify(storeValue));
    }
    persistInSession(key, value) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        key = key.trim();
        if (value == null) {
            sessionStorage.setItem(key, null);
            return;
        }
        const storeValue = { item: value };
        sessionStorage.setItem(key, JSON.stringify(storeValue));
    }
    retrieve(key) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        key = key.trim();
        const value = localStorage.getItem(key);
        if (value == null)
            return null;
        const parsedValue = JSON.parse(value);
        return parsedValue.item;
    }
    retrieveFromSession(key) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        key = key.trim();
        const value = sessionStorage.getItem(key);
        if (value == null)
            return null;
        const parsedValue = JSON.parse(value);
        return parsedValue.item;
    }
    remove(key) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensureIsString();
        key = key.trim();
        localStorage.removeItem(key);
    }
    removeFromSession(key) {
        (0, n_defensive_1.given)(key, "key").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        key = key.trim();
        sessionStorage.removeItem(key);
    }
}
exports.DefaultStorageService = DefaultStorageService;
//# sourceMappingURL=default-storage-service.js.map