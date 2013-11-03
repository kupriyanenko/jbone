(function(window, undefined) {

    // Match a standalone tag
    var rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/;

    // A simple way to check for HTML strings
    // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
    var rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;

    function jBone() {
        if (this instanceof jBone) {
            return init.apply(this, arguments[0]);
        } else {
            return new jBone(arguments);
        }
    }

    jBone._cache = {
        events: {},
        jid: 0
    };

    jBone._data = function(el) {
        el = el instanceof jBone ? el[0] : el;

        if (el === window) {
            return {
                jid: 'window'
            };
        } else {
            return {
                jid: el.jid
            };
        }
    }

    function init() {
        if (Array.isArray(arguments[0])) {
            arguments[0].forEach(function(el) {
                addElement.call(this, [el]);
            }, this);
        } else {
            addElement.call(this, arguments);
        }

        return this;
    }

    function createDOMElement() {
        var tagName = arguments[0].match(rsingleTag)[1],
            el = document.createElement(tagName);

        jBone(el).attr(arguments[1]);
        pushElement.call(this, el);
    }

    function createDOMFromString(html) {
        var wraper = document.createElement('div');
        wraper.innerHTML = html;

        pushElement.call(this, wraper.firstChild);
    }

    function findDOMElements(selector) {
        var elems = document.querySelectorAll(selector);

        [].forEach.call(elems, function(el) {
            pushElement.call(this, el);
        }, this);
    }

    function addElement(args) {
        if (typeof args[0] === 'string' && args[0].match(rsingleTag)) {
            createDOMElement.apply(this, args);
        } else if (typeof args[0] === 'string' && args[0].match(rquickExpr) && args[0].match(rquickExpr)[1]) {
            createDOMFromString.apply(this, args);
        } else if (typeof args[0] === 'string') {
            findDOMElements.apply(this, args);
        } else if (typeof args[0] !== 'string') {
            pushElement.call(this, args[0]);
        }
    }

    function pushElement(el) {
        var jid = el.jid || undefined;

        if (el === window) {
            jid = 'window';
        } else if (!el.jid) {
            jid = ++jBone._cache.jid;
            el.jid = jid;
        }

        if (!jBone._cache.events[jid]) {
            jBone._cache.events[jid] = {};
        }

        this.push(el);
    }

    jBone.prototype = new Array;

    jBone.prototype.on = function() {
        var event = arguments[0],
            callback, target, namespace, fn, events;

        if (arguments.length === 2) {
            callback = arguments[1];
        } else {
            target = arguments[1], callback = arguments[2];
        }

        this.forEach(function(el) {
            events = jBone._cache.events[jBone._data(el).jid];
            namespace = event.split('.')[1];
            event = event.split('.')[0];
            events[event] = events[event] ? events[event] : [];

            fn = function(e) {
                if (!target) {
                    callback.call(el, e);
                } else {
                    if (~jBone(el).find(target).indexOf(e.target)) {
                        callback.call(el, e);
                    }
                }
            }

            events[event].push({
                namespace: namespace,
                fn: fn,
                originfn: callback
            });

            if (el.addEventListener) {
                el.addEventListener(event, fn, false);
            }
        });

        return this;
    }

    jBone.prototype.trigger = function(eventName, data) {
        var event = document.createEvent('CustomEvent');
        event.initCustomEvent(eventName, true, true, null);

        this.forEach(function(el) {
            if (el.dispatchEvent) {
                el.dispatchEvent(event);
            } else if (jBone._cache.events[jBase._data(el).jid][eventName]) {
                jBone._cache.events[jBase._data(el).jid][eventName].forEach(function(fn) {
                    fn.fn.call(el, data);
                });
            }
        });

        return this;
    }

    jBone.prototype.off = function(event, fn) {
        var getCallback = function(e) {
            if (fn && e.originfn === fn) {
                return e.fn;
            } else if (!fn) {
                return e.fn;
            }
        }

        var namespace = event.split('.')[1],
            event = event.split('.')[0],
            events, callback;

        this.forEach(function(el) {
            events = jBone._cache.events[jBone._data(el).jid];

            // remove all events
            if (events[event]) {
                events[event].forEach(function(e) {
                    callback = getCallback(e);
                    if (namespace) {
                        if (e.namespace === namespace) {
                            el.removeEventListener(event, callback);
                        }
                    } else if (!namespace) {
                        el.removeEventListener(event, callback);
                    }
                });
            }
            // remove namespaced events
            else if (namespace) {
                Object.keys(events).forEach(function(key) {
                    events[key].forEach(function(e) {
                        callback = getCallback(e);
                        if (e.namespace === namespace) {
                            el.removeEventListener(key, callback);
                        }
                    });
                });
            }
        });

        return this;
    }

    jBone.prototype.attr = function() {
        var args = arguments;

        if (typeof args[0] === 'string') {
            this.forEach(function(el) {
                el.setAttribute(args[0], args[1]);
            });
        } else if (args[0] instanceof Object) {
            this.forEach(function(el) {
                Object.keys(args[0]).forEach(function(key) {
                    el.setAttribute(key, args[0][key]);
                });
            });
        }

        return this;
    };

    jBone.prototype.find = function(selector) {
        var results = [];

        this.forEach(function(el) {
            [].forEach.call(el.querySelectorAll(selector), function(finded) {
                results.push(finded);
            });
        });

        return jBone(results);
    }

    jBone.prototype.get = function(index) {
        return this[index];
    }

    jBone.prototype.eq = function(index) {
        return jBone(this[index]);
    }

    jBone.prototype.html = function() {
        var value = arguments[0], result;

        // add html into elements
        if (value !== undefined) {
            this.forEach(function(el) {
                result = document.createDocumentFragment();

                if (value instanceof HTMLElement) {
                    result.appendChild(value);
                } else if (value instanceof jBone) {
                    value.forEach(function(j) {
                        result.appendChild(j);
                    });
                }

                if (typeof value === 'string') {
                    el.innerHTML = value;
                } else {
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

            return result.length ? result.join('') : null;
        }
    }

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
        } else if (appended instanceof HTMLElement) {
            this.forEach(function(el, i) {
                el.appendChild(appended);
            });
        }

        return this;
    }

    jBone.prototype.empty = function() {
        this.forEach(function(el) {
            while (el.hasChildNodes()) {
                el.removeChild(el.lastChild);
            }
        });

        return this;
    }

    jBone.prototype.is = function() {
        var args = arguments;

        return this.some(function(el) {
            return el.tagName.toLowerCase() === args[0];
        });
    }

    jBone.prototype.has = function() {
        var args = arguments;

        return this.some(function(el) {
            return el.querySelectorAll(args[0]).length;
        });
    }

    window.jBone = window.$ = jBone;

})(window);
