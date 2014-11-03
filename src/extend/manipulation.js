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

fn.prepend = function (prepended) {
    var i = 0, length = this.length, setter;

    // create jBone object and then prepend
    if (isString(prepended) && rquickExpr.exec(prepended)) {
        prepended = jBone(prepended);
    }
    // create text node for inserting
    else if (!isObject(prepended)) {
        prepended = document.createTextNode(prepended);
    }
    prepended = prepended instanceof jBone ? prepended : jBone(prepended);

    setter = function(el, i) {
        prepended.forEach(function(node, index) {
            el.insertBefore( i ? node.cloneNode(true) : node, el.children[index]);
        });
    };

    for (; i < length; i++) {
        setter(this[i], i);
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
