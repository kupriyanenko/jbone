jBone.fn.find = function(selector) {
    var results = [];

    this.forEach(function(el) {
        [].forEach.call(el.querySelectorAll(selector), function(finded) {
            results.push(finded);
        });
    });

    return jBone(results);
};

jBone.fn.get = function(index) {
    return this[index];
};

jBone.fn.eq = function(index) {
    return jBone(this[index]);
};

jBone.fn.html = function() {
    var value = arguments[0], result;

    // add HTML into elements
    if (value !== undefined) {
        this.empty.call(this);
        this.append.call(this, value);

        return this;
    }
    // get HTML from element
    else {
        result = [];

        this.forEach(function(el) {
            if (el instanceof HTMLElement) {
                result.push(el.innerHTML);
            }
        });

        return result.length ? result.join("") : null;
    }
};

jBone.fn.append = function(appended) {
    if (typeof appended === "string") {
        appended = jBone(appended);
    }

    if (appended instanceof jBone) {
        this.forEach(function(el, i) {
            appended.forEach(function(jel) {
                if (!i) {
                    el.appendChild(jel);
                } else {
                    el.appendChild(jel.cloneNode());
                }
            });
        });
    } else if (appended instanceof HTMLElement || appended instanceof DocumentFragment) {
        this.forEach(function(el) {
            el.appendChild(appended);
        });
    }

    return this;
};

jBone.fn.appendTo = function(to) {
    jBone(to).append(this);

    return this;
};

jBone.fn.parent = function() {
    var results = [];

    this.forEach(function(el) {
        if (!~results.indexOf(el.parentNode)) {
            results.push(el.parentNode);
        }
    });

    return jBone(results);
};

jBone.fn.parents = function(element) {
    var results = [], search;

    search = function(el, element) {
        if (el === element) {
            return results.push(el);
        }
        if (!el.parentNode) {
            return;
        }

        search(el.parentNode, element);
    };

    if (element instanceof HTMLElement) {
        element = jBone(element);
    }

    this.forEach(function(el) {
        element.forEach(function(element) {
            search(el.parentNode, element);
        });
    });

    return jBone(results);
};

jBone.fn.empty = function() {
    this.forEach(function(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    });

    return this;
};

jBone.fn.remove = function() {
    this.forEach(function(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });

    return this;
};
