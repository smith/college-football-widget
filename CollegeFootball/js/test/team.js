module("team", {
    setup : function () {
        this.team = CollegeSportsWidget.team;
        this.widget = { urls : {}, ui : { loading : function () {} } };
    }
});

test("create", function () {
    expect(2);
    var t = this.team;

    ok(typeof t === "function", "team is a function");
    ok(typeof t() === "object", "team makes an object");
});

asyncTest("getSchedule", function () {
    var t = this.team("name", {}, this.widget);
    t.getSchedule();
    function afterScheduleLoaded() {
        ok(true, "afterScheduleLoaded fires");
        ok(Array.isArray(t.games), "team.games is an Array")
        start();
    }
    $(this.widget).bind("afterScheduleLoaded", afterScheduleLoaded);
});

test("date formatting", function () {
    expect(1);    
    same(Date.parse("12:30 PM"), Date.today().addHours(12.5), 
        "12:30 PM gets parsed")
});


