var
// Quick match a standalone tag
rquickSingleTag = /^<(\w+)\s*\/?>$/,

// A simple way to check for HTML strings
// Prioritize #id over <tag> to avoid XSS via location.hash
rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,

// Alias for function
slice = [].slice,
splice = [].splice,
keys = Object.keys,

// Alias for global variables
doc = document,

isString = function(el) {
    return typeof el === "string";
},
isObject = function(el) {
    return el instanceof Object;
},
isFunction = function(el) {
    return typeof el === "function";
};

jBone = function(element, data) {
    return new jBone.fn.init(element, data);
};

jBone.fn = jBone.prototype = {
    init: function(element, data) {
        var elements, tag, wraper, fragment;

        if (isString(element)) {
            // Create single DOM element
            if (tag = rquickSingleTag.exec(element)) {
                this[0] = doc.createElement(tag[1]);
                this.length = 1;

                if (isObject(data)) {
                    this.attr(data);
                }

                return this;
            }
            // Create DOM collection
            else if ((tag = rquickExpr.exec(element)) && tag[1]) {
                fragment = doc.createDocumentFragment();
                wraper = doc.createElement("div");
                wraper.innerHTML = element;
                while (wraper.lastChild) {
                    fragment.appendChild(wraper.firstChild);
                }
                elements = slice.call(fragment.childNodes);

                return jBone.merge(this, elements);
            }
            // Find DOM elements with querySelectorAll
            else {
                if (jBone.isElement(data)) {
                    return jBone(data).find(element);
                }

                try {
                    elements = slice.call(doc.querySelectorAll(element));

                    return jBone.merge(this, elements);
                } catch (e) {
                    return this;
                }
            }
        }
        // Run function
        else if (isFunction(element)) {
            return element();
        }
        // Return jBone element as is
        else if (element instanceof jBone) {
            return element;
        }
        // Return element wrapped by jBone
        else if (element) {
            element = Array.isArray(element) ? element : [element];
            return jBone.merge(this, element);
        }

        return this;
    },

    pop: [].pop,
    push: [].push,
    reverse: [].reverse,
    shift: [].shift,
    sort: [].sort,
    splice: [].splice,
    slice: [].slice,
    indexOf: [].indexOf,
    forEach: [].forEach,
    unshift: [].unshift,
    concat: [].concat,
    join: [].join,
    every: [].every,
    some: [].some,
    filter: [].filter,
    map: [].map,
    reduce: [].reduce,
    reduceRight: [].reduceRight,
    length: 0
};

jBone.fn.constructor = jBone;

jBone.fn.init.prototype = jBone.fn;

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
