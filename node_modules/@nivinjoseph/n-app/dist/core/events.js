"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.eventsSymbol = void 0;
require("reflect-metadata");
const n_defensive_1 = require("@nivinjoseph/n-defensive");
require("@nivinjoseph/n-ext");
exports.eventsSymbol = Symbol("events");
// public
function events(...events) {
    const initChars = "abcdefghijklmnopqrstuvwxyz".split("");
    (0, n_defensive_1.given)(events, "events")
        .ensureHasValue()
        .ensure(t => t.length > 0, "cannot be empty")
        .ensure(t => t.length === t.distinct().length, "duplicate events")
        .ensure(t => t.every(u => u.trim().toLowerCase() !== "input"), "event cannot be reserved event input")
        .ensure(t => t.every(u => initChars.contains(u.trim()[0].toLowerCase())), "event name has to start with alphabet");
    return (target) => Reflect.defineMetadata(exports.eventsSymbol, events, target);
}
exports.events = events;
//# sourceMappingURL=events.js.map