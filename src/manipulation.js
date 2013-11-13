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
    return jBone(this[0].parentNode);
};

jBone.fn.parents = function(selector) {
    var results = [], search;

    search = function(selector, el) {
        if (el === selector) {
            results.push(el);
        } else if (!el.parentNode) {
            return;
        }

        search(selector, el.parentNode);
    };

    if (typeof selector === "string") {
        selector = jBone(selector);
    }


    this.forEach(function(el) {
        if (selector instanceof HTMLElement) {
            search(selector, el);
        } else if (selector instanceof jBone) {
            selector.forEach(function(selector) {
                search(selector, el);
            });
        }
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
