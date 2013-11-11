jBone.fn.on = function() {
    var event = arguments[0],
        callback, target, namespace, fn, events;

    if (arguments.length === 2) {
        callback = arguments[1];
    } else {
        target = arguments[1], callback = arguments[2];
    }

    this.forEach(function(el) {
        events = jBone._data(el).events;
        namespace = event.split(".")[1];
        event = event.split(".")[0];
        events[event] = events[event] ? events[event] : [];

        fn = function(e) {
            if (e.namespace && e.namespace !== namespace) {
                return;
            }

            if (!target) {
                callback.call(el, e);
            } else {
                if (~jBone(el).find(target).indexOf(e.target)) {
                    callback.call(el, e);
                }
            }
        };

        events[event].push({
            namespace: namespace,
            fn: fn,
            originfn: callback
        });

        if (el.addEventListener) {
            el.addEventListener(event, fn, false);
        }
    });

    return this;
};

jBone.fn.one = function() {
    var event = arguments[0], originTarget = this,
        callback, target, fn;

    if (arguments.length === 2) {
        callback = arguments[1];
    } else {
        target = arguments[1], callback = arguments[2];
    }

    fn = function(e) {
        callback.call(this, e);
        originTarget.off(event, fn);
    };

    if (arguments.length === 2) {
        this.on(event, fn);
    } else {
        this.on(event, target, fn);
    }

    return this;
};

jBone.fn.trigger = function(eventName, data) {
    if (!eventName || !eventName.split(".")[0]) {
        return this;
    }

    var namespace = eventName.split(".")[1], event;
    eventName = eventName.split(".")[0];

    if ("CustomEvent" in window) {
        event = document.createEvent("CustomEvent");
        event.initCustomEvent(eventName, true, true, null);
    } else {
        event = document.createEvent("Event");
        event.initEvent(eventName, true, true);
    }
    event.namespace = namespace;

    this.forEach(function(el) {
        if (el.dispatchEvent) {
            el.dispatchEvent(event);
        } else if (jBone._data(el).events[eventName]) {
            jBone._data(el).events[eventName].forEach(function(fn) {
                fn.fn.call(el, data);
            });
        }
    });

    return this;
};

jBone.fn.off = function(event, fn) {
    var events, callback,
        namespace = event.split(".")[1],
        getCallback = function(e) {
            if (fn && e.originfn === fn) {
                return e.fn;
            } else if (!fn) {
                return e.fn;
            }
        };

    event = event.split(".")[0];

    this.forEach(function(el) {
        events = jBone._data(el).events;

        // remove named events
        if (events[event]) {
            events[event].forEach(function(e) {
                callback = getCallback(e);
                if (namespace) {
                    if (e.namespace === namespace) {
                        el.removeEventListener(event, callback);
                    }
                } else if (!namespace) {
                    el.removeEventListener(event, callback);
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

    return this;
};
