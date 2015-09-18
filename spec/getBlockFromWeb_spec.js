describe("getBlockFromWeb", function() {
	'use strict';
	var bitCoinHash = require('../bitCoinHash.js');
	
	var complete = false;
	var result;

	beforeEach(function(done) {
		bitCoinHash.getBlockFromWeb('https://blockexplorer.com/api/block/000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f')
			.then(function(block) {
				result = block;
				done();
			});
	});

	it("is a function", function() {
		var typeName = typeof(bitCoinHash.getBlockFromWeb);
		expect(typeName).toEqual('function');
	});

	it("should be able to fetch the genesis block", function() {
		expect(result.hash).toEqual('000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f');
	});
});