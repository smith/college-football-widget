module("main");

test("Basic Requirements", function () {
    expect(6);
    ok($ && jQuery, "jQuery");
    ok(Date.today, "Datejs");
    ok(Object.create, "Object.create");
    ok(Object.keys, "Object,keys");
    ok(Array.isArray, "Array.isArray");
    ok(Array.prototype.forEach, "Array#forEach");

});
