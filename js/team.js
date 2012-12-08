define(["require", "exports", "jquery", "schedule"],
       function (require, exports, $, schedule) {
    exports.create = function (team) {
        team = team || {};

        team.getSchedule = function () {
            var d = $.Deferred();
            $.get("http://espn.go.com/college-football/team/schedule/_/id/" + team.id,
                  function (html) {
                var s = team.schedule = schedule.create(html);
                d.resolve(s.toHtml());
            });
            return d;
        };

        return team;
    };
});
