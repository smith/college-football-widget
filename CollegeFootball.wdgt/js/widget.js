// Shims for dashboard widget
define(["jquery"], function ($) {
    var div, i, front, w = window.widget;

    if (w) {
        // Put a dashboard class on the body for css
        $("body").addClass("dashboard");

        // Use the openURL method on links
        $("a").live("click", function (event) {
            w.openURL($(this).attr("href"));
            return false;
        });

    }
});
