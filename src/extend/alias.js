fn.click = function() {
    return this.trigger("click");
};

fn.height = function(value) {
    if (value !== undefined) {
        this.forEach(function(el) {
            el.style.height = value;
        });

        return this;
    }

    return this[0].clientHeight;
};

fn.focus = function() {
    return this.trigger("focus");
};

fn.scrollTop = function() {
    return this[0].scrollTop || this[0].scrollY || 0;
};

fn.bind = fn.on;
