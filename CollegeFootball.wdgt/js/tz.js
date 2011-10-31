// Timezone utility functions
define(["jquery", "./date"], function ($) {
    var localTzOffset = new Date().getTimezoneOffset(),
        // The GMT offset, in minutes, of the eastern timezone. DST DIAF
        etTzOffset = 240, // TODO: Calculate this. Godspeed.
        tzDiff = etTzOffset - localTzOffset;

    return {
        // Convert the time (12:00 PM) from eastern to local
        convert: function (time) {
            // No need to change
            if (tzDiff === 0) { return time; }

            // Create a new date, apply the offset, and format
            return Date.parse("1970-01-01 " + time).
                addMinutes(tzDiff).
                toString("h:mm tt");
        }
    };
});
