/*global $, CollegeSportsWidget */

require.def("team", function () {

var team = {};

team.create = function (name, info, w) {
    w = w || { urls : {} };
    var t = Object.create(info || {}),
        logoFormat = "gif";

    function process(html) {
        var games = [], game = {};

        function cell(index, td) {
            td = $(td);
            var tvImg, resultTime;

            switch (index) {
            case 0: // date
                game.day = td.html(); // TODO: format date
                break;
            case 1: // opponent
                game.opponent = td.text().replace(/No\.\s/g, "#");
                break;
            case 2: // result/time
                // Store result or time
                resultTime = td.text().replace(/\sET.*$/g, ""); // remove tz
                game.resultTime = resultTime;
                if (resultTime.indexOf("-") === -1) { // no dash means time
                    game.time = resultTime;
                } else {
                    game.result = resultTime;
                }

                // get tv network image
                tvImg = td.find("img")[0];
                if (tvImg) { game.tvImg = tvImg.src; }
                break;
            default:
                break;
            }
        }

        function row(index, tr) {
            game = {};
            var cells = $(tr).find("td");
            if (cells.length > 1) { cells.each(cell); }
            else { game = null; }
            if (game !== null) { games.push(game); } // TODO: Sort games
        }

        $(html).find("table tr:not('.stathead,.colhead')").each(row);

        t.games = games;
        $(w).trigger("afterScheduleLoaded");
    }

    t.name = String(name);
    t.conference = w.selectedConference;
    t.urls = {};
    t.games = [];

    Object.keys(w.urls).forEach(function (k) {
        t.urls[k] = w.urls[k] + t.id;
    });
    t.urls.logo = w.urls.logo + t.id + "." + logoFormat;

    // Look in the games to see if there is one today
    t.todaysGame = (function() {
        var today = Date.today(), date, game;

        for (var i = 0; i < t.games.length; i += 1) {
            date = Date(t.games[i].date).clearTime();
            if (Date.equals(date, today)) { game = t.games[i]; }
        }

        return game;
    })();
    t.isGameDay = !!t.todaysGame;
    t.cacheEnabled = !t.isGameDay;

    t.isScheduleLoaded = false;
    $(w).bind("afterScheduleLoaded",
        function () { t.isScheduleLoaded = true; }
    );

    t.getSchedule = function () {
        w.ui.loading("on");
        $.get(t.urls.schedule, process);
    };

    t.getHTML = function () {
        if (typeof t.html !== "string" && !t.cacheEnabled) {
            t.html = (function () {
                var games = t.games || [],
                    html = "<table>";
                games.forEach(function (g) {
                    html += "<tr><td>" + g.day + "</td><td>" + g.opponent +
                        "</td><td>" + g.resultTime + "</td></tr>";
                });
                html += "</table>";
                return html;
            })();
        }
        return t.html;
    };

    return t;
};

return team;

});
