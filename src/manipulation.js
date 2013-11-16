jBone.fn.html = function(value) {
    var result = [];

    // add HTML into elements
    if (value !== undefined) {
        this.empty().append(value);

        return this;
    }

    // get HTML from elements
    this.forEach(function(el) {
        if (el instanceof HTMLElement) {
            result.push(el.innerHTML);
        }
    });

    return result.length ? result.join("") : null;
};

jBone.fn.append = function(appended) {
    var setter;

    if (isString(appended) && rquickExpr.exec(appended)) {
        appended = jBone(appended);
    } else if (!isObject(appended)) {
        appended = document.createTextNode(appended);
    }

    if (appended instanceof jBone) {
        setter = function(el, i) {
            appended.forEach(function(node) {
                if (i) {
                    el.appendChild(node.cloneNode());
                } else {
                    el.appendChild(node);
                }
            });
        };
    } else if (appended instanceof Node) {
        setter = function(el) {
            el.appendChild(appended);
        };
    }

    this.forEach(setter);

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
        el.jdata = {};

        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });

    return this;
};
