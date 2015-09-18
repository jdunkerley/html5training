describe('getSHA256', function() {
  'use strict';
  var bitCoinHash = require('../bitCoinHash.js');

  it('is a function', function() {
    var typeName = typeof bitCoinHash.getSHA256;
    expect(typeName).toEqual('function');
  });

  it('should be able to calculate SHA256 for Hello World', function() {
    var initial = 'Hello World';
    var test = bitCoinHash.getSHA256(initial);
    var expected = 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e';
    expect(test).toEqual(expected);
  });
});
