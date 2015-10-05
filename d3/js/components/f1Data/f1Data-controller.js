(function() {
  'use strict';

  angular.module('d3Test.f1Data', [
    'd3Test.f1DataServices',
    ])
    .controller('f1Controller', ['f1Data', function(f1Data) {
      var _this = this;

      _this.valueField = f1Data.valueFields[0];
      _this.valueFields = function() {
        return f1Data.valueFields;
      };

      _this.data = [];

      f1Data.getData()
        .then(function(data) {
          _this.data = data;
      });

    },]);
})();
