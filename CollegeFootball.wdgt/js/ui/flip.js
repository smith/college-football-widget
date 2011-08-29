// Provides an abstraction for flipping the widget over on the Mac Dashboard or
// a web context
define(function () {
    return {
        perform: function (front, back, event) {
            var toSide, w = window.widget;
            if (w) {
                toSide = front.is(":visible") ? "ToBack" : "ToFront";
                w.prepareForTransition(toSide);
                if (toSide === "ToFront") {
                    front.height(back.height());
                    back.hide();
                    front.show();
                } else {
                    // Normalize height
                    back.height(front.height());
                    front.hide();
                    back.show();
                }
                setTimeout(function () { w.performTransition(); }, 0);
            } else {
                front.toggle();
                back.toggle();
            }
            return false;
        }
    };
});
