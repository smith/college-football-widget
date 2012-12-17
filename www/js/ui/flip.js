// Provides an abstraction for flipping over
define(["jquery"], function ($) {
    return {
        perform: function (event) {
            $('body').toggleClass('settings-visible');
            return false;
        }
    };
});
