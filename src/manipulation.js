jBone.fn.html = function(value) {
    var result = [];

    // add HTML into elements
    if (value !== undefined) {
        this.empty.call(this);

        if (!(value instanceof Object) && !rquickExpr.exec(value)) {
            this.forEach(function(el) {
                if (el instanceof HTMLElement) {
                    el.innerHTML = value;
                }
            });
        } else {
            this.append.call(this, value);
        }

        return this;
    }

    // get HTML from element
    this.forEach(function(el) {
        if (el instanceof HTMLElement) {
            result.push(el.innerHTML);
        }
    });

    return result.length ? result.join("") : null;
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
