jBone.Event = function(event) {
    var namespace, eventType;

    namespace = event.split(".").splice(1).join(".");
    eventType = event.split(".")[0];

    event = doc.createEvent("Event");
    event.initEvent(eventType, true, true);

    event.namespace = namespace;
    event.isDefaultPrevented = function() {
        return event.defaultPrevented;
    };

    return event;
};

jBone.fn.on = function(event) {
    var args = arguments,
        callback, target, namespace, fn, events, eventType;

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
            events[eventType] = events[eventType] ? events[eventType] : [];

            fn = function(e) {
                if (e.namespace && e.namespace !== namespace) {
                    return;
                }

                if (!target) {
                    callback.call(el, e);
                } else if (~jBone(el).find(target).indexOf(e.target) || jBone.contains(jBone(el).find(target), e.target)) {
                    callback.call(e.target, e);
                }
            };

            events[eventType].push({
                namespace: namespace,
                fn: fn,
                originfn: callback
            });

            if (el.addEventListener) {
                el.addEventListener(eventType, fn, false);
            }
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
                callback.call(el, e);
                jBone(el).off(event, fn);
            };

            if (args.length === 2) {
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
            return $.Event(event);
        });
    } else {
        events = [event];
    }

    this.forEach(function(el) {
        events.forEach(function(event) {
            if (!event.type) {
                return;
            }

            if (el.dispatchEvent) {
                el.dispatchEvent(event);
            }
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
            // remove namespaced events
            else if (namespace) {
                Object.keys(events).forEach(function(key) {
                    events[key].forEach(function(e) {
                        callback = getCallback(e);
                        if (e.namespace === namespace) {
                            el.removeEventListener(key, callback);
                        }
                    });
                });
            }
        });
    });

    return this;
};
