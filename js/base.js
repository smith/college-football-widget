/**
 * Language extensions and globals
 */

/*global $, CollegeSportsWidget */

var CollegeSportsWidget = {};

if (typeof Object.create !== "function") {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

if (typeof Object.keys !== "function") {
    Object.keys = function (o) {
        var results = [];
        for (var property in o) { if(o.hasOwnProperty(property)) {
            results.push(property);
        }}
        return results;
    };
}

if (typeof Array.isArray !== "function") {
    Array.isArray = function(obj) {
        return Object.prototype.toString.call(obj) == "[object Array]";
    };
}

if (typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function (block) {
        $.each(block);
    };
}
