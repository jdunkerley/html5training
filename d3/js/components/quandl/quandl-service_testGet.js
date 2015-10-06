(function() {
  'use strict';
  
  describe('Quandl Service', function() {
    var quandlSvc;
    
    beforeEach(function() {
      module('d3Test.quandlServices');
    })

    beforeEach(inject(function(quandl) {
      quandlSvc = quandl;
    }));
    
    // it('should get some data', function(done) {
    //   quandlSvc
    //     .getData('YAHOO/L_ARM')
    //     .then(function(dataArray) {
    //       console.log('here');
    //       expect(dataArray).not.toBeUndefined();
    //       done();
    //     });
    // }, 15000)
    
  });  	
})();