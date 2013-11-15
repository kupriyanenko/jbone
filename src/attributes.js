jBone.fn.attr = function() {
    var args = arguments;

    if (typeof args[0] === "string" && args.length === 1) {
        return this[0].getAttribute(args[0]);
    } else if (typeof args[0] === "string" && args.length > 1) {
        this.forEach(function(el) {
            el.setAttribute(args[0], args[1]);
        });
    } else if (args[0] instanceof Object) {
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

    if (typeof args[0] === "string" && args.length === 2) {
        this.forEach(function(el) {
            el.style[args[0]] = args[1];
        });
    } else if (args[0] instanceof Object) {
        this.forEach(function(el) {
            Object.keys(args[0]).forEach(function(key) {
                el.style[key] = args[0][key];
            });
        });
    }

    return this;
};
