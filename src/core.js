var
// Match a standalone tag
rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

// Alias for function
slice = [].slice,
keys = Object.keys,

// Alias for global variables
doc = document,
win = window,

isString = function(el) {
    return typeof el === "string";
},

isObject = function(el) {
    return el instanceof Object;
},

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

    if (isObject(data) && !jBone.isElement(data)) {
        this.attr(data);
    }

    return this;
},

getElement = function(element, context) {
    var tag, wraper;

    if (isString(element) && (tag = rsingleTag.exec(element))) {
        return doc.createElement(tag[1]);
    } else if (isString(element) && (tag = rquickExpr.exec(element)) && tag[1]) {
        wraper = doc.createElement("div");
        wraper.innerHTML = element;
        return slice.call(wraper.childNodes);
    } else if (isString(element)) {
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
    var jid = el.jid;

    if (el === win) {
        jid = "window";
    } else if (el.jid === undefined) {
        el.jid = jid = ++jBone._cache.jid;
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
    return el instanceof jBone || el instanceof HTMLElement || isString(el);
};

jBone._cache = {
    events: {},
    jid: 0
};

jBone.fn = jBone.prototype = [];
