define(["require", "exports", "jquery", "schedule", "jquery.xdomainajax"],
       function (require, exports, $, schedule) {
    exports.create = function (team) {
        team = team || {};

        team.getSchedule = function () {
            var d = $.Deferred();
            $.get("http://espn.go.com/college-football/team/_/id/" + team.id,
                  function (data) {
                var s = team.schedule = schedule.create(data.responseText);
                d.resolve(s.toHtml());
            });
            return d;
        };

        return team;
    };
});
