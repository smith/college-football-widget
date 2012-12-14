// Provides an abstraction for flipping over
define(function () {
    return {
        perform: function (front, back, event) {
            front.toggle();
            back.toggle();
            return false;
        }
    };
});
