jBone.prototype.find = function(selector) {
    var results = [];

    this.forEach(function(el) {
        [].forEach.call(el.querySelectorAll(selector), function(finded) {
            results.push(finded);
        });
    });

    return jBone(results);
};

jBone.prototype.get = function(index) {
    return this[index];
};

jBone.prototype.eq = function(index) {
    return jBone(this[index]);
};

jBone.prototype.html = function() {
    var value = arguments[0], result;

    // add html into elements
    if (value !== undefined) {
        this.forEach(function(el) {
            if (typeof value === "string") {
                el.innerHTML = value;
            } else {
                result = document.createDocumentFragment();

                if (value instanceof HTMLElement || value instanceof DocumentFragment) {
                    result.appendChild(value);
                } else if (value instanceof jBone) {
                    value.forEach(function(j) {
                        result.appendChild(j);
                    });
                }

                jBone(el).empty();
                el.appendChild(result);
            }
        });

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

jBone.prototype.append = function(appended) {
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

jBone.prototype.empty = function() {
    this.forEach(function(el) {
        while (el.hasChildNodes()) {
            el.removeChild(el.lastChild);
        }
    });

    return this;
};

jBone.prototype.remove = function() {
    this.forEach(function(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });

    return this;
};
