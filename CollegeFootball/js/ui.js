/*global window, widget, $, CollegeSportsWidget */
(function (w) {

w.ui = {};
var ui = w.ui;


ui.load = function () {
    ui.buttons = {
        flip : $("#flip"),
        done : $("#done")
    };
    ui.selects = {
        conference : $("#conference"), 
        team : $("#team")
    };
    ui.links = {
        news : $("#news"),
        stats : $("#stats")
    };
    ui.front = $("#front");
    ui.title = $("#name");
    ui.logo = $("#logo");
    ui.schedule = $("#schedule");

    ui.selects.conference.bind("change", ui.populateTeamSelect);
    ui.selects.conference.bind("change", w.setTeam);
    ui.selects.team.bind("change", w.setTeam);
    ui.buttons.flip.bind("click", ui.flip);
    ui.buttons.done.bind("click", function (evt) { 
        evt.preventDefault();
        ui.flip()
    });
};

ui.populateSelect = function (info, select) {
    info = Object.keys(info) || [];
    select = select;
    var items = [], item;

    function option (i) {
        return '<option>' + i + '</option>';
    }

    $.each(info, function (index, i) {
        item = option(i);
        items.push(item);
    });

    select.html(items.join(""));
};

ui.populateConferenceSelect = function (evt, info) {
    info = info || {};    
    w.info = info;
    ui.populateSelect(info, ui.selects.conference);
    w.selectedConference = ui.selects.conference.val();
    ui.populateTeamSelect();
};

ui.populateTeamSelect = function (evt) {
    var conf = evt ? $(evt.currentTarget).val() : ui.selects.conference.val();
    ui.populateSelect(w.info[conf], ui.selects.team);
};

ui.update = function (team) {
    w.currentTeam.getHTML();
    ui.updateLogo();
    ui.updateTitle();
    ui.updateTable();
    ui.updateBackground();
    ui.updateLinks();
    ui.loading("off");
};

ui.updateLogo = function () {
    ui.logo.attr("src", w.currentTeam.urls.logo);
};

ui.updateTitle = function () {
    ui.title.html(w.currentTeam.name);
};

ui.updateLinks = function () {
    ["news", "stats"].forEach(function (i) {
        ui.links[i].attr("href", w.currentTeam.urls[i]);
    });
};

ui.updateBackground = function() {
    ui.front.css("background-color", "#" + w.currentTeam.color);
}

ui.updateTable = function () {
    ui.schedule.html(w.currentTeam.html);
};

ui.openURL = function (evt) {
    var url = $(this).href,
        open;
    evt.preventDefault();
    if (w.isDashboardWidget) { open = widget.openURL; }
    else { open = window.open; }
    open(url);
};

ui.flip = function () {
    var front = $("#front"),
        showing = front.css("display") === "block" ? "#front" : "#back",
        other = showing === "#front" ? "#back" : "#front",
        s = "fast";
    
    $(showing).slideToggle(s, function () { $(other).slideToggle(s); });
};

ui.loading = function (newState) {

};

})(CollegeSportsWidget || {});
