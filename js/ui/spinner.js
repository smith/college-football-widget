// Make the spinner spin
define(["jquery", "../spin"], function ($) {
    var s = new Spinner({
        lines: 12,
        length: 12,
        width: 2,
        radius: 12,
        trail: 32,
        speed: 2,
        color: "#fff" }).spin(),
        present = false;


    return {
        toggle: function (el) {
            var sel = $(s.el).css({ left: "50%", top: "40%" });
            if (!present) {
                el.append(sel);
                present = true;
                sel.toggle();
            }
            sel.toggle();
        }
    };
});
