jBone.merge = function(first, second) {
    var l = second.length,
        i = first.length,
        j = 0;

    while (j < l) {
        first[i++] = second[j];
        j++;
    }

    first.length = i;

    return first;
};

jBone.contains = function(container, contained) {
    var result;

    container.some(function(el) {
        if (el.contains(contained)) {
            return result = container;
        }
    });

    return result;
};

jBone.extend = function(target) {
    [].splice.call(arguments, 1).forEach(function(object) {
      for (var prop in object) {
        target[prop] = object[prop];
      }
    });

    return target;
};
