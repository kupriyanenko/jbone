function Event(e, data) {
    var key, setter;

    this.originalEvent = e;

    setter = function(key, e) {
        if (key === "preventDefault") {
            this[key] = function() {
                this.defaultPrevented = true;
                return e[key]();
            };
        } else if (typeof e[key] === "function") {
            this[key] = function() {
                return e[key]();
            };
        } else {
            this[key] = e[key];
        }
    };

    for (key in e) {
        setter.call(this, key, e);
    }

    jBone.extend(this, data);
}

jBone.Event = function(event, data) {
    var namespace, eventType;

    if (event.type && !data) {
        data = event;
        event = event.type;
    }

    namespace = event.split(".").splice(1).join(".");
    eventType = event.split(".")[0];

    event = doc.createEvent("Event");
    event.initEvent(eventType, true, true);

    return jBone.extend(event, {
        namespace: namespace,
        isDefaultPrevented: function() {
            return event.defaultPrevented;
        }
    }, data);
};

jBone.fn.on = function(event) {
    var args = arguments,
        callback, target, namespace, fn, events, eventType, expectedTarget;

    if (args.length === 2) {
        callback = args[1];
    } else {
        target = args[1], callback = args[2];
    }

    this.forEach(function(el) {
        jBone.setId(el);
        events = jBone.getData(el).events;
        event.split(" ").forEach(function(event) {
            eventType = event.split(".")[0];
            namespace = event.split(".").splice(1).join(".");
            events[eventType] = events[eventType] || [];

            fn = function(e) {
                if (e.namespace && e.namespace !== namespace) {
                    return;
                }

                expectedTarget = null;
                if (!target) {
                    callback.call(el, e);
                } else if (~jBone(el).find(target).indexOf(e.target) || (expectedTarget = jBone.contains(jBone(el).find(target), e.target))) {
                    expectedTarget = expectedTarget || e.target;
                    e = new Event(e, {
                        currentTarget: expectedTarget
                    });

                    callback.call(expectedTarget, e);
                }
            };

            events[eventType].push({
                namespace: namespace,
                fn: fn,
                originfn: callback
            });

            el.addEventListener && el.addEventListener(eventType, fn, false);
        });
    });

    return this;
};

jBone.fn.one = function() {
    var event = arguments[0], args = arguments,
        callback, target;

    if (args.length === 2) {
        callback = args[1];
    } else {
        target = args[1], callback = args[2];
    }

    this.forEach(function(el) {
        event.split(" ").forEach(function(event) {
            var fn = function(e) {
                jBone(el).off(event, fn);
                callback.call(el, e);
            };

            if (!target) {
                jBone(el).on(event, fn);
            } else {
                jBone(el).on(event, target, fn);
            }
        });
    });

    return this;
};

jBone.fn.trigger = function(event) {
    var events = [];

    if (!event) {
        return this;
    }

    if (isString(event)) {
        events = event.split(" ").map(function(event) {
            return jBone.Event(event);
        });
    } else {
        event = event instanceof Event ? event : $.Event(event);
        events = [event];
    }

    this.forEach(function(el) {
        events.forEach(function(event) {
            if (!event.type) {
                return;
            }

            el.dispatchEvent && el.dispatchEvent(event);
        });
    });

    return this;
};

jBone.fn.off = function(event, fn) {
    var events, callback, namespace, eventType,
        getCallback = function(e) {
            if (fn && e.originfn === fn) {
                return e.fn;
            } else if (!fn) {
                return e.fn;
            }
        };

    this.forEach(function(el) {
        events = jBone.getData(el).events;

        if (!events) {
            return;
        }

        event.split(" ").forEach(function(event) {
            eventType = event.split(".")[0];
            namespace = event.split(".").splice(1).join(".");

            // remove named events
            if (events[eventType]) {
                events[eventType].forEach(function(e) {
                    callback = getCallback(e);
                    if (!namespace || (namespace && e.namespace === namespace)) {
                        el.removeEventListener(eventType, callback);
                    }
                });
            }
            // remove all namespaced events
            else if (namespace) {
                keys(events).forEach(function(key) {
                    events[key].forEach(function(e) {
                        callback = getCallback(e);
                        if (e.namespace.split(".")[0] === namespace.split(".")[0]) {
                            el.removeEventListener(key, callback);
                        }
                    });
                });
            }
        });
    });

    return this;
};
