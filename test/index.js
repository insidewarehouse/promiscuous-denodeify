var denodeify = require('../index');
var expect = require("referee").expect;

describe('denodeify', function () {

	var trivialOkFn = function (arg1, arg2, cb) {
		setTimeout(function () {
			cb(null, { arg1: arg1, arg2: arg2 }, { one: "more" });
		}, 0);
	};

	var trivialFailFn = function (cb) {
		setTimeout(function () {
			cb(new Error("Failing!"));
		}, 0);
	};

	it('should resolve', function () {

		var trivialOkPromisedFn = denodeify(trivialOkFn);
		return trivialOkPromisedFn("one", "two")
			.then(function () {
				expect(arguments.length).toEqual(1);
				expect(arguments[0].length).toEqual(2);
				var res = arguments[0];
				expect(res[0]).toEqual({ arg1: "one", arg2: "two" });
				expect(res[1]).toEqual({ one: "more" });
			})

	});

	it('should reject', function () {

		var trivialFailPromisedFn = denodeify(trivialFailFn);
		return trivialFailPromisedFn()
			.catch(function (err) {
				expect(err.message).toEqual("Failing!");
			})

	});

});
