var jdunkerley = {};

jdunkerley.bitcoin = function() {
	var crypto = require('crypto');

	function createBlockHeader(blockObject) {
		var buffer = new Buffer(80);
		buffer.writeIntLE(blockObject.version, 0, 4); // Version - 4 bytes

		// Genesis Block doesnt contain this so add 0
		if (blockObject.previousblockhash) {
			buffer.write(pairwiseReverse(blockObject.previousblockhash), 4, 32, 'hex'); // hashPrevBlock - 32 bytes
		} else {
			buffer.writeIntLE(0, 4, 32);
		}

		buffer.write(pairwiseReverse(blockObject.merkleroot), 36, 32, 'hex');// hashMerkleBlock - 32 bytes
		buffer.writeIntLE(blockObject.time, 68, 4); // time - 4 bytes
		buffer.write(pairwiseReverse(blockObject.bits), 72, 4, 'hex'); // bits - 4 bytes
		buffer.writeUIntLE(blockObject.nonce, 76, 4); // nonce - 4 bytes
		return buffer.toString('hex');
	}

	function createHash(blockHeader) {
		var hash = getSHA256(new Buffer(blockHeader, 'hex'));
		return pairwiseReverse(getSHA256(new Buffer(hash, 'hex')));
	}

	function checkHash(blockObject) {
		return blockObject.hash === createHash(createBlockHeader(blockObject));
	}

	function getSHA256(input) {
		var sha256 = crypto.createHash('sha256');
		sha256.update(input, 'ascii');
		return sha256.digest('hex');		
	}

	function pairwiseReverse(input) {
		var output = '';

		for (var i = input.length - 2; i >= 0; i -= 2) {
			output += input.substr(i, 2);
		}		

		return output;
	}

	return {
		getSHA256: getSHA256,
		pairwiseReverse: pairwiseReverse,
		createBlockHeader: createBlockHeader,
		createHash: createHash,
		checkHash: checkHash
	};
}();


function testPairReverse() {
	var initial = '12345678';
	var test = jdunkerley.bitcoin.pairwiseReverse(initial);
	var expected = '78563412';
	console.log('PairReverse : ' + (test === expected ? "PASS" : "FAIL"));
}

function testBlockCreate() {
	var testCase = {
		'hash':'00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d',
		'confirmations':249232,
		'size':1496,
		'height':125552,
		'version':1,
		'merkleroot':'2b12fcf1b09288fcaff797d71e950e71ae42b91e8bdb2304758dfcffc2b620e3',
		'tx':['51d37bdd871c9e1f4d5541be67a6ab625e32028744d7d4609d0c37747b40cd2d','60c25dda8d41f8d3d7d5c6249e2ea1b05a25bf7ae2ad6d904b512b31f997e1a1','01f314cdd8566d3e5dbdd97de2d9fbfbfd6873e916a00d48758282cbb81a45b9','b519286a1040da6ad83c783eb2872659eaf57b1bec088e614776ffe7dc8f6d01'],
		'time':1305998791,
		'nonce':2504433986,
		'bits':'1a44b9f2',
		'difficulty':244112.48777434,
		'chainwork':'0000000000000000000000000000000000000000000000006aa84fd45b2350c9',
		'previousblockhash':'00000000000008a3a41b85b8b29ad444def299fee21793cd8b9e567eab02cd81',
		'nextblockhash':'0000000000001c0533ea776756cb6fdedbd952d3ab8bc71de3cd3f8a44cbaf85',
		'reward':50,
		'isMainChain':true
	}

	var test = jdunkerley.bitcoin.createBlockHeader(testCase);
	var expected = '01000000' +
	    '81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000' +
	    'e320b6c2fffc8d750423db8b1eb942ae710e951ed797f7affc8892b0f1fc122b' +
	    'c7f5d74d' +
	    'f2b9441a' +
	    '42a14695';
	//console.log(testCaseBlock);
	console.log('CreateBlockHeader : ' + (test === expected ? "PASS" : "FAIL"));
}

function testSHA256() {
	var initial = 'Hello World';
	var test = jdunkerley.bitcoin.getSHA256(initial);
	var expected = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e'
	console.log('SHA256 : ' + (test === expected ? "PASS" : "FAIL"));
}

function testCreateHash() {
	var initial = '01000000' +
	    '81cd02ab7e569e8bcd9317e2fe99f2de44d49ab2b8851ba4a308000000000000' +
	    'e320b6c2fffc8d750423db8b1eb942ae710e951ed797f7affc8892b0f1fc122b' +
	    'c7f5d74d' +
	    'f2b9441a' +
	    '42a14695';
	var test = jdunkerley.bitcoin.createHash(initial);
	var expected = '00000000000000001e8d6829a8a21adc5d38d0a473b144b6765798e61f98bd1d';
	console.log('CreateHash : ' + (test === expected ? "PASS" : "FAIL"));
}

function testGenesisHash() {
	var genesis = {
		'hash':'000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
		'confirmations':374775,
		'size':285,
		'height':0,
		'version':1,
		'merkleroot':'4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
		'tx':['4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b'],
		'time':1231006505,
		'nonce':2083236893,
		'bits':'1d00ffff',
		'difficulty':1,
		'chainwork':'0000000000000000000000000000000000000000000000000000000100010001',
		'nextblockhash':'00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048',
		'isMainChain':true
	};
	console.log('Genesis Hash : ' + (jdunkerley.bitcoin.checkHash(genesis) ? 'Ok' : 'Error'));	
}

testSHA256();
testPairReverse();
testBlockCreate();
testCreateHash();
testGenesisHash();
