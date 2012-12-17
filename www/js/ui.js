define(  ["require", "exports", "jquery", "./ui/scrolling", "./team", "./ui/flip", "./pref", "./ui/spinner", "jquery/noclickdelay"],
function (require, exports, $, scrolling, team, flip, pref, spinner) {
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

    function doFlip(event) {
        conferencesSelect.blur();
        teamsSelect.blur();
        spinner.toggle(front);
        return flip.perform(event);
    }

    function doneClick(event) {
        $.when(data).then(function (d) {
            exports.setTeam(team.create(
                d[conferencesSelect.val()][teamsSelect.val()]
            ));
            doFlip();
        });
        return false;
    }

    // Save a preference
    function save(event) {
        pref.set("conference", conferencesSelect.val());
        pref.set("team", teamsSelect.val());
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
        team.getSchedule().then(function (html) {
            spinner.toggle(front);
            t.html(html).show();
        });
    };

    exports.load = function () {
        // Default team and conference
        var t = pref.get("team") || 2294,
            c = pref.get("conference") || "Big Ten",
            flipper = $("#flipper");

        $.when(data, loadConferences(c), loadTeams(c)).then(function (d) {
            conferencesSelect.val(c);
            teamsSelect.val(t);
            exports.setTeam(team.create(d[0][c][t]));
        });
        conferencesSelect.on("change", conferenceChange);
        $("button").on("click", doneClick).on("click", save);
        flipper.on("click", doFlip);
        // Add active class to touched buttons and links
        $("a, button").on("touchstart", function () {
            $(this).addClass("active");
        });
        $("a, button").on("touchend", function () {
            $(this).removeClass("active");
        });

        spinner.toggle(front);
        // Scrolling for content
        scrolling.start();
    };
});
