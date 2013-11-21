jBone.fn.find = function(selector) {
    var results = [];

    this.forEach(function(el) {
        if (typeof el.querySelectorAll === "function") {
            [].forEach.call(el.querySelectorAll(selector), function(found) {
                results.push(found);
            });
        }
    });

    return jBone(results);
};

jBone.fn.get = function(index) {
    return this[index];
};

jBone.fn.eq = function(index) {
    return jBone(this[index]);
};

jBone.fn.parent = function() {
    var results = [], parent;

    this.forEach(function(el) {
        if (!~results.indexOf(parent = el.parentElement) && parent) {
            results.push(parent);
        }
    });

    return jBone(results);
};

jBone.fn.toArray = function() {
    return slice.call(this);
};

jBone.fn.is = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.tagName.toLowerCase() === args[0];
    });
};

jBone.fn.has = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.querySelectorAll(args[0]).length;
    });
};
