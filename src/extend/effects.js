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

fn.show = function() {
    return showHide(this, true);
};

fn.hide = function() {
    return showHide(this);
};
