// Definitions for scrolling behavior
define(["jquery", "iscroll"], function ($, IScroll) {
    var fHeader, fScroll, bHeader, bScroll;

    return {
        start: function () {
            fHeader = new IScroll("front-header", { hScroll: false, vScroll: false });
            fScroll = new IScroll("front-scroll-wrap", { hScrollBar: false, hScroll: false });
            bHeader = new IScroll("back-header", { hScroll: false, vScroll: false });
            // This makes is so the selects don't work :\
            /*bScroll = new IScroll("back-scroll-wrap", { hScrollBar: false, hScroll: false });*/
        }
    };
});
