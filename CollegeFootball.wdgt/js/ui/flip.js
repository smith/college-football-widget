// Provides an abstraction for flipping the widget over on the Mac Dashboard or
// a web context
define(function () {
    return {
        perform: function (front, back, event) {
            var toSide, w = window.widget;
            if (w) {
                toSide = front.is(":visible") ? "ToBack" : "ToFront";
                alert("hi");
                w.prepareForTransition(toSide);
                if (toSide === "ToFront") {
                    front.toggle();
                    back.toggle();
                } else {
                    back.toggle();
                    front.toggle();
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
