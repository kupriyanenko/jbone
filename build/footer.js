if (typeof define === "function" && define.amd) {
    define(function() {
        return jBone;
    });
}

if (typeof win === "object" && typeof win.document === "object") {
    win.jBone = win.$ = jBone;
}

}());
