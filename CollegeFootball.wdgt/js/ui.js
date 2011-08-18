define(["require", "exports", "jquery", "team"], function (require, exports, $, team) {
    var prefixes = {
            logo: "http://a2.espncdn.com/prod/assets/clubhouses/2010/ncaa/logos/",
            stats: "http://espn.go.com/college-football/team/stats/_/id/",
            news: "http://espn.go.com/ncf/local/team?id="
        },
        data = $.getJSON("data.json"),
        conferencesSelect = $("#conferences"),
        teamsSelect = $("#teams"),
        front = $("#front"),
        back = $("#back");

    function loadConferences(conference) {
        var d = $.Deferred();
        $.when(data).then(function (data) {
            var s = $("<select />");
            Object.keys(data).forEach(function (item) {
                s.append($("<option />").val(item).text(item));
            });
            conferencesSelect.html(s.html()).val(conference);
            d.resolve(conference);
        });
        return d;
    }

    function loadTeams(conference) {
        $.when(data).then(function (d) {
            var s = $("<select />"),
                teams = d[conference];
            Object.keys(teams).forEach(function (id) {
                s.append($("<option />").val(id).text(teams[id].name));
            });
            teamsSelect.html(s.html());
        });
    }

    function conferenceChange(event) {
        loadTeams($(this).val());
    }

    function flip(event) {
        front.toggle();
        back.toggle();
        return false;
    }

    function doneClick(event) {
        $.when(data).then(function (d) {
            exports.setTeam(team.create(
                d[conferencesSelect.val()][teamsSelect.val()]
            ));
            flip();
        });
        return false;

    }

    exports.setTeam = function (team) {
        var t = $("table");
        front.css("backgroundColor", team.color || "black");
        $("#logo").attr("src", prefixes.logo + team.id + ".png");
        front.find("h1").html(team.name);
        $("#stats").attr("href", prefixes.stats + team.id);
        $("#news").attr("href", prefixes.news + team.id);

        t.hide();
        team.getSchedule().then(function (html) { t.html(html).show(); });
    };

    exports.load = function () {
        // Default team and conference
        var t = {
            id: 2294,
            name: "Iowa"
        },
        c = "Big Ten";

        exports.setTeam(team.create(t));
        $.when(data, loadConferences(c)).then(function () { loadTeams(c); });
        conferencesSelect.live("change", conferenceChange);
        $("button").live("click", doneClick);
        $(".flipper").live("click", flip);
        back.hide();
    };
});
