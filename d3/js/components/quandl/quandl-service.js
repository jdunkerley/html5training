(function() {
  'use strict';

  angular.module('d3Test.quandlServices', [
    ])
    .service('quandl', [function() {
      var _apiKey = '';
      var baseUrl = 'https://www.quandl.com/api/v3/';

      this.apiKey = function(newKey) {
        if (arguments.length === 0) {
          return this._apiKey;
        }

        this._apiKey = newKey;
        return this;
      };

      this.createDataUrl = function(databaseCode, dataSetCode) {
        var output = baseUrl + databaseCode + '/' + dataSetCode + '/data.json';

        // Remove double slashes
        output = output.replace(/\/\//g,'/');

        return output;
      };
    }]);
})();