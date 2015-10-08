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

    it('should exist', function() {
      expect(quandlSvc).toBeDefined();
    });
    
    it('should have no API Key at start', function() {
      expect(quandlSvc.apiKey()).toBe('');
    });
    
    it('should return self if API Key set', function() {
      expect(quandlSvc.apiKey('testing')).toBe(quandlSvc);
    });
    
    it('should store the set API Key set', function() {
      expect(quandlSvc.apiKey('testing').apiKey()).toBe('testing');
    });

    it('should be able to produce a data URL for YAHOO L_ARM', function() {
      var dataUrl = quandlSvc.createDataUrl('YAHOO', 'L_ARM');
      expect(dataUrl).toBe('https://www.quandl.com/api/v3/datasets/YAHOO/L_ARM/data.json');
    });

    it('should be able to produce a data URL for YAHOO/L_ARM', function() {
      var dataUrl = quandlSvc.createDataUrl('YAHOO/L_ARM');
      expect(dataUrl).toBe('https://www.quandl.com/api/v3/datasets/YAHOO/L_ARM/data.json');
    });

    it('should be able to remove double // from data URL', function() {
      var dataUrl = quandlSvc.createDataUrl('YAHOO/', 'L_ARM');
      expect(dataUrl).toBe('https://www.quandl.com/api/v3/datasets/YAHOO/L_ARM/data.json');
    });

    it('should be able to create URL from object', function() {
      var dataUrl = quandlSvc.createDataUrl({
        database: 'YAHOO',
        dataSet: 'L_ARM'
      });
      expect(dataUrl).toBe('https://www.quandl.com/api/v3/datasets/YAHOO/L_ARM/data.json');
    });
    
    var testObject = {"column_names": ["Date","Open","High","Low","Close","Volume","Adjusted Close"],
"data": [
["2015-10-05",45.75,46.889999,45.700001,46.630001,33015500,46.630001],
["2015-10-02",44.27,45.57,43.919998,45.57,41571500,45.57],
["2015-10-01",44.75,44.75,43.75,44.610001,28470400,44.610001]
]};

    it('should be able to read testObject', function() {
      var parsed = quandlSvc.getDataArray(testObject);
      expect(parsed.length).toBe(3);
    });

    it('should be able to parse dates', function() {
      var parsed = quandlSvc.getDataArray(testObject);
      expect(parsed[0].Date).toBeDefined();
      expect(parsed[0].Date instanceof Date).toBe(true);
      expect(parsed[0].Date.getFullYear()).toBe(2015);
      expect(parsed[0].Date.getMonth() + 1).toBe(10);
      expect(parsed[0].Date.getDate()).toBe(5);
    });

    it('should have all the columns', function() {
      var parsed = quandlSvc.getDataArray(testObject);
      expect(parsed[0].Date).toBeDefined('Date');
      expect(parsed[0].Open).toBeDefined('Open');
      expect(parsed[0].High).toBeDefined('High');
      expect(parsed[0].Low).toBeDefined('Low');
      expect(parsed[0].Close).toBeDefined('Close');
      expect(parsed[0].Volume).toBeDefined('Volume');
      expect(parsed[0]['Adjusted Close']).toBeDefined('Adjusted Close');
    });    
  })
})();