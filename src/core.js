// Match a standalone tag
var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
var rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

function jBone() {
    if (this instanceof jBone) {
        return init.apply(this, arguments[0]);
    } else {
        return new jBone(arguments);
    }
}

jBone.fn = jBone.prototype = [];

jBone._cache = {
    events: {},
    jid: 0
};

jBone._data = function(el) {
    el = el instanceof jBone ? el[0] : el;

    var jid = el === window ? "window" : el.jid;

    return {
        jid: jid,
        events: jBone._cache.events[jid]
    };
};

function init() {
    if (Array.isArray(arguments[0])) {
        arguments[0].forEach(function(el) {
            addElement.call(this, [el]);
        }, this);
    } else if (arguments[0]) {
        addElement.call(this, arguments);
    }

    return this;
}

function addElement(args) {
    if (typeof args[0] === "string" && args[0].match(rsingleTag)) {
        createDOMElement.call(this, args[0], args[1]);
    } else if (typeof args[0] === "string" && args[0].match(rquickExpr) && args[0].match(rquickExpr)[1]) {
        createDOMFromString.apply(this, args);
    } else if (typeof args[0] === "string") {
        findDOMElements.apply(this, args);
    } else if (typeof args[0] !== "string") {
        pushElement.call(this, args[0]);
    }
}

function createDOMElement(tagName, data) {
    tagName = tagName.match(rsingleTag)[1];
    var el = document.createElement(tagName);

    if (data) {
        jBone(el).attr(data);
    }
    pushElement.call(this, el);
}

function createDOMFromString(html) {
    var wraper = document.createElement("div");
    wraper.innerHTML = html;

    [].forEach.call(wraper.childNodes, function(node) {
        pushElement.call(this, node);
    }.bind(this));
}

function findDOMElements(selector) {
    var elems = document.querySelectorAll(selector);

    [].forEach.call(elems, function(el) {
        pushElement.call(this, el);
    }, this);
}

function pushElement(el) {
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

    this.push(el);
}

global.jBone = global.$ = jBone;
