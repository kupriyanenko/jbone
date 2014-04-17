fn.prop = function(name, value) {
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

fn.removeAttr = function(name) {
    this.forEach(function(el) {
        el.removeAttribute(name);
    });
};

fn.addClass = function(className) {
    var i = 0,
        j = 0,
        length = this.length,
        classes;

    for (; i < length; i++) {
        classes = className.trim().split(/\s+/);

        for (; j < classes.length; j++) {
            this[i].classList.add(classes[j]);
        }
    }

    return this;
};

fn.removeClass = function(className) {
    this.forEach(function(el) {
        className.split(" ").forEach(function(className) {
            el.classList.remove(className);
        });
    });

    return this;
};

fn.hasClass = function(className) {
    return this.some(function(el) {
        return el.classList.contains(className);
    });
};

fn.toggleClass = function(className) {
    this.forEach(function(el) {
        el.classList.toggle(className);
    });

    return this;
};
