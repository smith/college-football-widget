define(["require", "exports", "jquery"], function (require, exports, $) {
    var cellMethods;

    function convertTZ(time) {
        console.log(time);
        return time;
    }

    function row(i, r) {
        var cells = $(r).find("td"),
            o = {},
            cols = ["date", "opponent", "resultTime", "recordTickets"]

        cells.each(function (i, c) {
            cellMethods[cols[i]]($(c), o);
        });

        return o;
    }

    function process(html) {
        var table = $(html).find("div.mod-content table:first"),
            rows = table.find("tr.oddrow, tr.evenrow");
        return rows.map(row);
    }

    cellMethods = {
        date: function (cell, o) {
            var d = new Date(cell.find("p").html());
            o.date = [d.getMonth() + 1, d.getDate()].join("/");
        },
        opponent: function (cell, o) {
            var team = cell.find(".team-name a").html(),
                away = cell.find("p").html() === "@";
            o.opponent = (away ? "at " : "") + team;
        },
        resultTime: function (cell, o) {
            var rt = o.resultTime = cell.find("p").text();
            if (/ET\s?$/.test(rt)) { rt = convertTZ(rt); }
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
