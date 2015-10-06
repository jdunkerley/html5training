/* global angular */
(function() {
  'use strict';

  angular.module('d3Test.f1Data')
    .controller('f1Controller', ['f1DataService', function(f1DataService) {
      var _this = this;

      _this.valueField = f1DataService.valueFields[0];
      _this.valueFields = function() {
        return f1DataService.valueFields;
      };

      _this.categoryField = f1DataService.categoryFields[0];
      _this.classField = f1DataService.categoryFields[1];
      _this.categoryFields = function() {
        return f1DataService.categoryFields;
      };

      _this.data = [];
      f1DataService.getData()
        .then(function(data) {
          _this.data = data;
        });
    },]);
})();
