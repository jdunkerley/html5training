'use strict';
describe("pairwiseReverse", function() {
	var bitCoinHash = require('../bitCoinHash.js');

	it("is a function", function() {
		var typeName = typeof(bitCoinHash.pairwiseReverse);
		expect(typeName).toEqual('function');
	});

	it("should be able to reverse 12345678", function() {
		var initial = '12345678';
		var test = bitCoinHash.pairwiseReverse(initial);
		var expected = '78563412';
		expect(test).toEqual(expected);
	});
});