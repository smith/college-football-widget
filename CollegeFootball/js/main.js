/*global window, document, widget, $, CollegeSportsWidget */
(function (w) {

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

    $(w).bind("afterTeamListLoaded", w.ui.populateConferenceSelect);
    $(w).bind("afterTeamListLoaded", w.setTeam);
    $(w).bind("afterScheduleLoaded", w.ui.update);

    w.ui.load();
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
    w.selectedConference = w.ui.selects.conference.val();
    w.selectedTeam = w.ui.selects.team.val();

    t = w.team(w.selectedTeam, w.info[w.selectedConference][w.selectedTeam], w);
    w.teams[t.name] = w.teams[t.name] || t;
    w.currentTeam = t;
    t.getSchedule();
};

$(document).ready(w.load);
$("a").click(w.ui.openURL);

})(CollegeSportsWidget || {});
