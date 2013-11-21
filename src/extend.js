jBone.fn.each = function(fn) {
    var length = this.length >>> 0,
        i = -1;

    while (++i < length) {
        if (i in this) {
            fn.call(this[i], i, this[i]);
        }
    }

    return this;
};

jBone.fn.prop = function(name, value) {
    var result;

    if (arguments.length === 1) {
        this.some(function(el) {
            if (name === "checked") {
                return result = el.checked;
            }

            return result = el.getAttribute(name);
        });

        return result;
    } else if (arguments.length === 2) {
        this.forEach(function(el) {
            el.setAttribute(name, value);
        });
    }

    return this;
};

jBone.fn.hasClass = function(className) {
    return this.some(function(el) {
        return el.classList.contains(className);
    });
};

jBone.fn.removeClass = function(className) {
    this.forEach(function(el) {
        className.split(" ").forEach(function(className) {
            el.classList.remove(className);
        });
    });

    return this;
};

jBone.fn.addClass = function(className) {
    this.forEach(function(el) {
        className.split(" ").forEach(function(className) {
            el.classList.add(className);
        });
    });

    return this;
};

jBone.fn.toggleClass = function(className) {
    this.forEach(function(el) {
        el.classList.toggle(className);
    });

    return this;
};

jBone.fn.click = function() {
    return this.trigger("click");
};

jBone.fn.height = function(value) {
    if (value !== undefined) {
        this.forEach(function(el) {
            el.style.height = value;
        });

        return this;
    }

    return this[0].clientHeight;
};

jBone.fn.removeAttr = function(name) {
    this.forEach(function(el) {
        el.removeAttribute(name);
    });
};

jBone.fn.closest = function(selector) {
    var parents, target, result;

    parents = jBone(selector);
    target = this[0];

    parents.some(function(parent) {
        return result = jBone.contains(jBone(parent), target);
    });

    return jBone(result);
};

jBone.fn.parents = function(selector) {
    var result = [], parents, target;

    if (selector) {
        parents = jBone(selector);

        parents.forEach(function(parent) {
            this.forEach(function(el) {
                if ((target = jBone.contains(jBone(parent), el)) && target.nodeType !== 9 && !~result.indexOf(target)) {
                    result.push(target);
                }
            });
        }, this);
    } else {
        this.forEach(function(el) {
            target = el;

            while ((target = target.parentNode) && target.nodeType !== 9) {
                if (!~result.indexOf(target)) {
                    result.push(target);
                }
            }
        });
    }

    return jBone(result);
};

jBone.fn.children = function() {
    var result = [];

    this.forEach(function(el) {
        [].forEach.call(el.childNodes, function(el) {
            if (el.nodeType !== 3) {
                result.push(el);
            }
        });
    });

    return jBone(result);
};

jBone.fn.not = function(condition) {
    var result = [];

    result = this.filter(function(el) {
        return el !== condition;
    });

    return jBone(result);
};

jBone.fn.focus = function() {
    return this.trigger("focus");
};

jBone.fn.siblings = function(includeSelf) {
    var result = [], parent;

    this.forEach(function(el) {
        if (parent = el.parentNode) {
            [].forEach.call(el.parentNode.childNodes, function(node) {
                if (includeSelf === undefined && node !== el && node.nodeType !== 3) {
                    result.push(node);
                } else if (includeSelf === true && node.nodeType !== 3) {
                    result.push(node);
                }
            });
        }
    });

    return jBone(result);
};

jBone.fn.next = function() {
    var result = [], next;

    this.forEach(function(el) {
        if (!~result.indexOf(next = el.nextElementSibling) && next) {
            result.push(next);
        }
    });

    return jBone(result);
};


jBone.fn.prev = function() {
    var result = [], previous;

    this.forEach(function(el) {
        if (!~result.indexOf(previous = el.previousElementSibling) && previous) {
            result.push(previous);
        }
    });

    return jBone(result);
};

jBone.fn.first = function() {
    return this.eq(0);
};

jBone.fn.last = function() {
    return this.eq(this.length - 1);
};

jBone.fn.index = function(element) {
    if (element instanceof jBone) {
        element = element[0];
    }

    if (element instanceof HTMLElement) {
        return this.indexOf(element);
    }
};

jBone.fn.is = function(match) {
    match = match.split(", ");

    return this.some(function(el) {
        return match.some(function(match) {
            // check visible
            if (match === ":visible") {
                return el.offsetWidth > 0 || el.offsetHeight > 0;
            }
            // check attribute
            else if (match[0] === ":") {
                return el.getAttribute(match.split(":")[1]) !== null;
            }
            // check class
            else if (match[0] === ".") {
                return el.classList.contains(match.split(".")[1]);
            }
            // check tagName
            else if (el.tagName.toLowerCase() === match) {
                return true;
            }
        });
    });
};

function isHidden(el) {
    return win.getComputedStyle(el).display === "none";
}

function showHide(elements, show) {
    var display;

    elements.forEach(function(el) {
        if (!el.style) {
            return;
        }

        display = el.style.display;
        if (show) {
            if (display === "none") {
                el.style.display = "";
            }

            if (el.style.display === "" && isHidden(el)) {
                el.style.display = "block";
            }
        } else {
            el.style.display = "none";
        }
    });

    return elements;
}

jBone.fn.show = function() {
    return showHide(this, true);
};

jBone.fn.hide = function() {
    return showHide(this);
};

jBone.fn.bind = jBone.fn.on;

jBone.camelCase = function(string) {
    return string.replace(/-([\da-z])/gi, function(all, letter) {
        return letter.toUpperCase();
    });
};

jBone.proxy = function(fn, context) {
    return fn.bind(context);
};

jBone.fn.map = function() {
    return jBone([].map.apply(this, arguments));
};

jBone.fn.scrollTop = function() {
    return this[0].scrollTop || this[0].scrollY || 0;
};

jBone.fn.text = function() {
    var result = [];

    this.forEach(function(el) {
        result.push(el.textContent);
    });

    return result.join("");
};

jBone.fn.detach = function() {
    this.forEach(function(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });

    return this;
};

jBone.fn.insertAfter = function(ref) {
    if (ref instanceof jBone) {
        ref = ref[0];
    }

    var parent = ref.parentNode,
        next = ref.nextSibling;

    if (next) {
        parent.insertBefore(this[0], next);
    } else {
        parent.appendChild(this[0]);
    }

    return this;
};

jBone.fn.offset = function(value) {
    if (value) {
        this.forEach(function(el) {
            el.offsetTop = value.top;
            el.offsetLeft = value.left;
        });
    } else {
        return {
            top: this[0].offsetTop,
            left: this[0].offsetLeft
        };
    }

    return this;
};

jBone.support = {};
