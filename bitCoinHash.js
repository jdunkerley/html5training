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

module.exports = checkHash;
module.exports.pairwiseReverse = pairwiseReverse;
module.exports.createBlockHeader = createBlockHeader;
module.exports.createHash = createHash;
module.exports.getSHA256 = getSHA256;
