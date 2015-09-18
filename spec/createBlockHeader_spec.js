describe("createBlockHeader", function() {
	'use strict';
	var bitCoinHash = require('../bitCoinHash.js');

	it("is a function", function() {
		var typeName = typeof(bitCoinHash.createBlockHeader);
		expect(typeName).toEqual('function');
	});

	it("should be able to calculate block header for test case", function() {
		var initial = {
			'version':1,
			'merkleroot':'2b12fcf1b09288fcaff797d71e950e71ae42b91e8bdb2304758dfcffc2b620e3',
			'time':1305998791,
			'nonce':2504433986,
			'bits':'1a44b9f2',
			'previousblockhash':'00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81'
		};
		
		bitCoinHash.useMerkleRoot(true);
		var test = bitCoinHash.createBlockHeader(initial);
		var expected = '01000000' +
	    	'81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000' +
	    	'e320b6c2fffc8d750423db8b1eb942ae710e951ed797f7affc8892b0f1fc122b' +
	    	'c7f5d74d' +
	    	'f2b9441a' +
	    	'42a14695';
		expect(test).toEqual(expected);
	});
});