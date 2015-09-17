'use strict';
var bitCoinHash = require('./bitCoinHash.js');

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
	console.log('Genesis Hash : ' + (bitCoinHash(genesis) ? 'Ok' : 'Error'));	
}

function checkBlockFromWeb (blockId) {
	var url = bitCoinHash.getBlockURL(blockId);
	console.log(url);

	var https = require('https');
	bitCoinHash.getBlockFromWeb(url, https, function(blockObject) {
		if (blockObject === null) {
			return;
		}

		console.log('Hash: ' + blockObject.hash + ' - ' + (bitCoinHash(blockObject) ? "OK" : "ERROR"));
	});
}

// Handle Command Line Args
bitCoinHash.useMerkleRoot(false);
if (process.argv.length < 3) {
	testGenesisHash();
} else {
	var blockId = process.argv[2].toLowerCase();
	checkBlockFromWeb(blockId);
}

// '00000000000000000462444ce0ce85d859596744a84594055dc1a53295be11b9'
