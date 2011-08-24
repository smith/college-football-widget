// Get or set preferences, using either localStorage or Dashboard prefs
define(function (require, exports) {
    var w = window.widget, engine, prefs = {}; // fallback

    function supportsLocalStorage() {
        try {
            return 'localStorage' in window && window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }

    // Determine storage method
    if (w) { engine = "widget"; }
    else if (supportsLocalStorage()) { engine = "localStorage"; }

    exports.get = function (pref) {
        var v;
        switch (engine) {
        case "localStorage":
            v = localStorage.getItem(pref);
            break;
        case "widget":
            v = w.preferenceForKey(pref);
            break;
        default:
            v = prefs[pref];
            break;
        }
        return v;
    };

    exports.set = function (pref, value) {
        switch (engine) {
        case "localStorage":
            localStorage.setItem(pref, value);
            break;
        case "widget":
            w.setPreferenceForKey(pref, value);
            prefs[pref] = value;
            break;
        default:
            prefs[pref] = value;
            break;
        }
    };
});
