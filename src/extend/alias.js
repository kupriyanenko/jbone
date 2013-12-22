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

jBone.fn.focus = function() {
    return this.trigger("focus");
};

jBone.fn.scrollTop = function() {
    return this[0].scrollTop || this[0].scrollY || 0;
};

jBone.fn.bind = jBone.fn.on;
