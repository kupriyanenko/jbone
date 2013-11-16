var
// Match a standalone tag
rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

slice = [].slice,

doc = document,

win = window,

jBone = function(element, data) {
    if (this instanceof jBone) {
        return init.call(this, element, data);
    } else {
        return new jBone(element, data);
    }
},

init = function(element, data) {
    var elements;

    if (typeof element === "function") {
        element();
    } else if (element instanceof jBone) {
        return element;
    } else if (Array.isArray(element)) {
        elements = element.map(function(el) {
            return getElement(el, data);
        });
    } else if (element) {
        elements = getElement(element, data);
    }

    if (elements instanceof jBone) {
        return elements;
    }

    if (!elements) {
        return this;
    }

    elements = Array.isArray(elements) ? elements : [elements];
    jBone.merge(this, elements);

    if (data instanceof Object && !jBone.isElement(data)) {
        this.attr(data);
    }

    return this;
},

getElement = function(element, context) {
    var tag, wraper;

    if (typeof element === "string" && (tag = rsingleTag.exec(element))) {
        return doc.createElement(tag[1]);
    } else if (typeof element === "string" && (tag = rquickExpr.exec(element)) && tag[1]) {
        wraper = doc.createElement("div");
        wraper.innerHTML = element;
        return slice.call(wraper.childNodes);
    } else if (typeof element === "string") {
        if (jBone.isElement(context)) {
            return jBone(context).find(element);
        }

        try {
            return slice.call(doc.querySelectorAll(element));
        } catch (e) {
            return;
        }
    }

    return element;
};

jBone.setId = function(el) {
    var jid = el.jid || undefined;

    if (el === win) {
        jid = "window";
    } else if (!el.jid) {
        jid = ++jBone._cache.jid;
        el.jid = jid;
    }

    if (!jBone._cache.events[jid]) {
        jBone._cache.events[jid] = {};
    }
};

jBone.getData = function(el) {
    el = el instanceof jBone ? el[0] : el;

    var jid = el === win ? "window" : el.jid;

    return {
        jid: jid,
        events: jBone._cache.events[jid]
    };
};

jBone.isElement = function(el) {
    return el instanceof jBone || el instanceof HTMLElement || typeof el === "string";
};

jBone.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    while (j < l) {
        first[i++] = second[j];
        j++;
    }

    first.length = i;

    return first;
};

jBone.contains = function(container, contained) {
    var search, result;

    search = function(el, element) {
        if (el === element) {
            return result = el;
        } else if (!el.parentNode) {
            return;
        }

        search(el.parentNode, element);
    };

    container.forEach(function(element) {
        search(contained.parentNode, element);
    });

    return result;
};

jBone._cache = {
    events: {},
    jid: 0
};

jBone.fn = jBone.prototype = [];
