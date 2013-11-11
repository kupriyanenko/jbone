jBone.fn.is = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.tagName.toLowerCase() === args[0];
    });
};

jBone.fn.has = function() {
    var args = arguments;

    return this.some(function(el) {
        return el.querySelectorAll(args[0]).length;
    });
};

jBone.fn.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    if (typeof l === "number") {
        while (j < l) {
            first[i++] = second[j];
            j++;
        }
    } else {
        while (second[j] !== undefined) {
            first[i++] = second[j++];
        }
    }

    first.length = i;

    return first;
};
