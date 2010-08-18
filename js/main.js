/*global window, document, require, widget, $ */

require.def("main", ["team", "ui", "json", "global-es5", "date"], function (team, ui) {

var w = {};

w.ui = ui;
w.isDashboardWidget = typeof widget === "object";
w.allowXDomain = w.isDashboardWidget;
w.teams = {};

w.currentTeam = {};
w.selectedSport = "ncf"; // TODO: Sports
w.selectedConference = "Big Ten";
w.selectedTeam = "Iowa";
w.selectedYear = Date.today().getFullYear(); // TODO: Years

var prefix = "http://sports.espn.go.com/" + w.selectedSport,
    proxy = "proxy.html?url=" + w.selectedSport;

w.urls = {
    news : prefix + "/local/team?id=",
    stats : prefix + "/teams/stats?teamid=",
    logo : "http://assets.espn.go.com/i/teamlogos/ncaa/sml/trans/",
    schedule : (w.allowXDomain ? prefix : proxy) +
               (w.allowXDomain ? "/teams/schedule?teamId=" :
                                 encodeURIComponent("/teams/schedule?teamId="))
};

w.load = function () {
    var t;

    $(w).bind("afterTeamListLoaded", ui.populateConferenceSelect);
    $(w).bind("afterTeamListLoaded", w.setTeam);
    $(w).bind("afterScheduleLoaded", ui.update);

    ui.load(w);
    w.getTeamList();
};

w.getTeamList = function () {
    $.getJSON("resources/teams.json", function (data) {
        w.info = data;
        $(w).trigger("afterTeamListLoaded", [data]);
    });
};

w.setTeam = function () {
    var t;
    w.selectedConference = ui.selects.conference.val();
    w.selectedTeam = ui.selects.team.val();

    t = team.create(
        w.selectedTeam, w.info[w.selectedConference][w.selectedTeam], w);
    w.teams[t.name] = w.teams[t.name] || t;
    w.currentTeam = t;
    t.getSchedule();
};

$(document).ready(w.load);
$("a").click(ui.openURL);

console.log(w);
});
