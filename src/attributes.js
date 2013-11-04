jBone.prototype.attr = function() {
    var args = arguments;

    if (typeof args[0] === "string") {
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
