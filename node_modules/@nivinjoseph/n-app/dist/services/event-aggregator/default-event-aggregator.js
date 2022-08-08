"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultEventAggregator = void 0;
const n_defensive_1 = require("@nivinjoseph/n-defensive");
class DefaultEventAggregator {
    constructor() {
        this._subscriptions = {};
    }
    subscribe(event, handler) {
        (0, n_defensive_1.given)(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        (0, n_defensive_1.given)(handler, "handler").ensureHasValue();
        event = event.trim();
        if (!this._subscriptions[event])
            this._subscriptions[event] = new Array();
        const eventSubscriptions = this._subscriptions[event];
        const existingRegistration = eventSubscriptions.find(t => t.handler === handler);
        if (existingRegistration)
            return existingRegistration.subscription;
        const eventSubscriptionInternal = new DefaultEventSubscriptionInternal();
        eventSubscriptionInternal.handler = handler;
        eventSubscriptionInternal.subscription = new DefaultEventSubscription(event, this, eventSubscriptionInternal);
        eventSubscriptions.push(eventSubscriptionInternal);
        return eventSubscriptionInternal.subscription;
    }
    publish(event, ...eventArgs) {
        (0, n_defensive_1.given)(event, "event").ensureHasValue().ensureIsString();
        event = event.trim();
        (0, n_defensive_1.given)(eventArgs, "eventArgs").ensureHasValue().ensureIsArray();
        if (!this._subscriptions[event])
            return;
        this._subscriptions[event].forEach(t => t.handler(...eventArgs));
    }
    _unsubscribe(event, subscription) {
        (0, n_defensive_1.given)(event, "event").ensureHasValue().ensure(t => !t.isEmptyOrWhiteSpace());
        event = event.trim();
        if (!this._subscriptions[event])
            return;
        this._subscriptions[event].remove(subscription);
    }
}
exports.DefaultEventAggregator = DefaultEventAggregator;
class DefaultEventSubscription {
    constructor(event, eventManager, subscription) {
        this._isUnsubscribed = false;
        (0, n_defensive_1.given)(event, "event").ensureHasValue().ensureIsString();
        this._event = event;
        (0, n_defensive_1.given)(eventManager, "eventManager").ensureHasValue().ensureIsType(DefaultEventAggregator);
        this._eventManager = eventManager;
        (0, n_defensive_1.given)(subscription, "subscription").ensureHasValue().ensureIsType(DefaultEventSubscriptionInternal);
        this._subscription = subscription;
    }
    get event() { return this._event; }
    unsubscribe() {
        if (this._isUnsubscribed)
            return;
        // @ts-expect-error: deliberately calling inaccessible private method
        this._eventManager._unsubscribe(this._event, this._subscription);
        this._isUnsubscribed = true;
    }
}
class DefaultEventSubscriptionInternal {
}
//# sourceMappingURL=default-event-aggregator.js.map