fn.text = function() {
    var result = [];

    this.forEach(function(el) {
        result.push(el.textContent);
    });

    return result.join("");
};

fn.detach = function() {
    this.forEach(function(el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
    });

    return this;
};

fn.insertAfter = function(ref) {
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

fn.offset = function(value) {
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

fn.replaceWith = function(сontent) {
    var replacement = сontent instanceof jBone ? сontent[0] : сontent;

    this.forEach(function(el) {
        if (el.parentNode) {
            el.parentNode.replaceChild(replacement, el);
            jBone(el).remove();
        }
    });

    return this;
};
