// Match a standalone tag
var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
var rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

function jBone(element, data) {
    if (this instanceof jBone) {
        return init.call(this, element, data);
    } else {
        return new jBone(element, data);
    }
}

function init(element, data) {
    var elements;

    if (element instanceof jBone) {
        return element;
    } else if (Array.isArray(element)) {
        elements = element.map(function(el) {
            return getElement(el, data);
        });
    } else if (element) {
        elements = getElement(element, data);
    }

    elements = Array.isArray(elements) ? elements : [elements];
    jBone.fn.merge(this, elements);

    if (data) {
        this.attr(data);
    }

    return this;
}

function getElement(element) {
    var tag, wraper;

    if (typeof element === "string" && (tag = rsingleTag.exec(element))) {
        return document.createElement(tag[1]);
    } else if (typeof element === "string" && (tag = rquickExpr.exec(element)) && tag[1]) {
        wraper = document.createElement("div");
        wraper.innerHTML = element;
        return [].slice.call(wraper.childNodes);
    } else if (typeof element === "string") {
        return [].slice.call(document.querySelectorAll(element));
    }

    return element;
}

jBone.setId = function(el) {
    var jid = el.jid || undefined;

    if (el === window) {
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

    var jid = el === window ? "window" : el.jid;

    return {
        jid: jid,
        events: jBone._cache.events[jid]
    };
};

jBone._cache = {
    events: {},
    jid: 0
};

jBone.fn = jBone.prototype = [];

global.jBone = global.$ = jBone;
