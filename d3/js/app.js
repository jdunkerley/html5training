(function() {
  'use strict';

  angular.module('d3Test.f1Data', []);
  angular.module('d3Test.barChart',[]);
  angular.module('d3Test.ohlcvChart', []);
  angular.module('d3Test.quandlServices', []);
  
  angular.module('d3TestF1Chart', [
    'd3Test.barChart',
    'd3Test.f1Data',
  ]);
  
  angular.module('d3Test.quandlDemo', [
    'd3Test.ohlcvChart',
    'd3Test.quandlServices'
  ]);
})();
