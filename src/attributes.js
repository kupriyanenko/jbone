jBone.fn.attr = function() {
    var args = arguments;

    if (isString(args[0]) && args.length === 1) {
        return this[0].getAttribute(args[0]);
    }

    if (args.length === 2) {
        this.forEach(function(el) {
            el.setAttribute(args[0], args[1]);
        });
    } else if (isObject(args[0])) {
        this.forEach(function(el) {
            Object.keys(args[0]).forEach(function(key) {
                el.setAttribute(key, args[0][key]);
            });
        });
    }

    return this;
};

jBone.fn.val = function(value) {
    if (arguments.length === 0) {
        return this[0].value;
    }

    this.forEach(function(el) {
        el.value = value;
    });

    return this;
};

jBone.fn.css = function() {
    var args = arguments;

    if (isString(args[0]) && args.length === 1) {
        return win.getComputedStyle(this[0])[args[0]];
    }

    if (args.length === 2) {
        this.forEach(function(el) {
            el.style[args[0]] = args[1];
        });
    } else if (isObject(args[0])) {
        this.forEach(function(el) {
            Object.keys(args[0]).forEach(function(key) {
                el.style[key] = args[0][key];
            });
        });
    }

    return this;
};

jBone.fn.data = function(key, value) {
    var args = arguments,
        setValue = function(el, key, value) {
            if (isObject(value)) {
                el.jdata = el.jdata || {};
                el.jdata[key] = value;
            } else {
                el.dataset[key] = value;
            }
        };

    if (args.length === 0) {
        return jBone.extend({}, this[0].dataset, this[0].jdata);
    }

    if (args.length === 1) {
        if (isString(key)) {
            return this[0].dataset[key] || this[0].jdata && this[0].jdata[key];
        } else if (isObject(key)) {
            Object.keys(key).forEach(function(name) {
                this.forEach(function(el) {
                    setValue(el, name, key[name]);
                });
            }, this);
        }
    } else if (args.length === 2) {
        this.forEach(function(el) {
            setValue(el, key, value);
        });
    }

    return this;
};
