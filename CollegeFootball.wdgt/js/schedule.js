var schedule = function (id, selector) {
    var baseURL = "http://espn.go.com/college-football/team/schedule/_/id/",
        url = baseURL + id,
        element = $(selector);

    function update(data) {
        element.html(data);
    }

    function toHTML(games) {
        games = games || [];

        var html = "<table>";
        games.forEach(function (g) {
            html += "<tr><td>" + g.day + "</td><td>" + g.opponent +
                "</td><td>" + g.resultTime + "</td></tr>";
        });
        return html + "</table>";
    }

    function process(html) {
        var rowSelector = "table tr:not('.stathead,.colhead')",
            games = [], game = {};

        function cell(index, td) {
            td = $(td);
            var tvImg, resultTime;

            function formatDate(date) {
                return date.toString("M/d");
            }

            function formatTime(time) {
                time = Date.parse(time + " EST");
                if (!time) { time = "TBD"; }
                else { time = time.toString("h:mm tt"); }
                return time;
            }

            switch (index) {
            case 0: // date
                game.date = Date.parse(td.html());
                game.day = formatDate(game.date);
                break;
            case 1: // opponent
                game.opponent = td.text().replace(/No\.\s/g, "#").replace(/^vs/, "").replace(/^\@/, "at ");
                break;
            case 2: // result/time
                // Store result or time
                resultTime = td.text().replace(/\sET.*$/g, ""); // remove tz
                game.resultTime = resultTime;
                if (resultTime.indexOf("-") === -1) { // no dash means time
                    game.time = game.resultTime = formatTime(resultTime);
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

        // Process a row
        function row(index, tr) {
            game = {};
            var cells = $(tr).find("td");
            if (cells.length > 1) { cells.each(cell); }
            else { game = null; }
            if (game !== null) { games.push(game); } // TODO: Sort games
        }

        $(html).find(rowSelector).each(row);
        update(toHTML(games));
    }

    $.get(url, process);
};
