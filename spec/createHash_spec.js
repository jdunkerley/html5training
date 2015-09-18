describe("createHash", function() {
	'use strict';
	var bitCoinHash = require('../bitCoinHash.js');

	it("is a function", function() {
		var typeName = typeof(bitCoinHash.createHash);
		expect(typeName).toEqual('function');
	});

	it("should be able to calculate SHA256 for Hello World", function() {
		var initial = '01000000' +
		    '81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000' +
		    'e320b6c2fffc8d750423db8b1eb942ae710e951ed797f7affc8892b0f1fc122b' +
		    'c7f5d74d' +
		    'f2b9441a' +
		    '42a14695';
		var test = bitCoinHash.createHash(initial);
		var expected = '00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d';
		expect(test).toEqual(expected);
	});
});