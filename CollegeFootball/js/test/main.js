module("main");

test("Basic Requirements", function () {
    expect(5);
    ok($ && jQuery, "jQuery");    
    ok(Date.today, "Datejs");
    ok(Object.create, "Object.create");
    ok(Object.keys, "Object,keys");
    ok(Array.prototype.forEach, "Array#forEach");

});
