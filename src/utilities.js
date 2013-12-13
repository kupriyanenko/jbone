jBone.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    while (j < l) {
        first[i++] = second[j++];
    }

    first.length = i;

    return first;
};

jBone.contains = function(container, contained) {
    var result;

    container.reverse().some(function(el) {
        if (el.contains(contained)) {
            return result = el;
        }
    });

    return result;
};

jBone.extend = function(target) {
    var k, kl, i, tg;

    splice.call(arguments, 1).forEach(function(object) {
        if (!object) {
            return;
        }

        k = keys(object);
        kl = k.length;
        i = 0;
        tg = target; //caching target for perf improvement

        for (; i < kl; i++) {
            tg[k[i]] = object[k[i]];
        }
    });

    return target;
};
