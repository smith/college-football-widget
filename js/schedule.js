define(["require", "exports", "jquery", "./date"], function (require, exports, $) {
    var cellMethods;

    function row(i, r) {
        var cells = $(r).find("td"),
            o = {},
            cols = ["date", "opponent", "resultTime", "recordTickets"];

        // If there's only one cell, it means they're putting something like
        // "INSIGHT BOWL" in there, so skip it
        if (cells.length > 1) {
            cells.each(function (i, c) {
                cellMethods[cols[i]]($(c), o);
            });
        }

        return o;
    }

    function process(html) {
        var table = $(html).find("div.mod-content table:first"),
            rows = table.find("tr.oddrow, tr.evenrow");
        return rows.map(row);
    }

    cellMethods = {
        date: function (cell, o) {
            var d = Date.parse(cell.find("p").html());
            o.date = [d.getMonth() + 1, d.getDate()].join("/");
        },
        opponent: function (cell, o) {
            var team = cell.find(".team-name a").html(),
                away = cell.find("p").html() === "@";
            o.opponent = (away ? "at " : "") + team;
        },
        resultTime: function (cell, o) {
            var rt = cell.text().trim();
            // If there's " ET " (eastern time)
            if (/\sET\s?/.test(rt)) {
                // Remove everything after the "ET "
                rt = rt.replace(/\sET\s?(.*)$/, "");
            }
            o.resultTime = rt;
        },
        recordTickets: function (cell, o) {}
    };

    exports.create = function (html) {
        var s = {};

        s.games = process(html);

        s.toHtml = function () {
            var t = $("<table />"),
                fields = ["date", "opponent", "resultTime"];

            s.games.each(function (i, game) {
                var row = $("<tr />");
                fields.forEach(function (f) {
                    row.append($("<td />").html(game[f]));
                });
                t.append(row);
            });
            return t.html();
        };

        return s;
    };
});
