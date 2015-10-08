(function() {
  'use strict';

  angular.module('d3Test.quandlServices')
    .service('quandl', ['$http', function($http) {
      var _this = this;
      
      var _apiKey = '';
      var baseUrl = 'https://www.quandl.com/api/v3/';

      this.apiKey = function(newKey) {
        if (arguments.length === 0) {
          return _apiKey || '';
        }

        _apiKey = newKey;
        return this;
      };

      this.createDataUrl = function(databaseCode, dataSetCode) {
        var output = '';
        
        // Parse Different Inputs
        if (arguments.length === 1) {
          if (typeof databaseCode === 'string') {
            output = databaseCode;
          } else if (typeof databaseCode ==='object') {
            output = databaseCode.database + '/' + databaseCode.dataSet;
          }
        } else if (arguments.length === 2) {
          output = databaseCode + '/' + dataSetCode;
        } 
        
        // Can't Cope With This
        if (output === '') {
          return undefined;
        }

        output = 'datasets/' + output + '/data.json';

        // Remove double slashes
        output = output.replace(/\/\//g,'/');
        output = baseUrl + output; 
        
        // Add API Key if set 
        var apiKey = _this.apiKey();
        if (apiKey !== '') {
          output += '?api_key=' + apiKey;
        }

        return output;
      };
      
      this.getDataArray = function(jsonData) {
        var colNames = jsonData.column_names;
          
        var output = [];
        for (var i = 0; i < jsonData.data.length; i++) {
          var dataPoint = jsonData.data[i];
          var newObject = {};
          for (var j = 0; j < dataPoint.length; j++) {
            // Column 0 - is always a date
            var datum = dataPoint[j];
            if (j === 0) {
              datum = new Date(dataPoint[j]);
            }
            
            newObject[colNames[j]] = datum;
          }

          output.push(newObject);
        }
        
        output.columnNames = colNames;
        
        return output;
      }
      
      this.createAdjustedSeries = function(dataArray) {                       
        if (dataArray.columnNames.indexOf('Close') === -1 || dataArray.columnNames.indexOf('Adjusted Close') === -1) {
          return dataArray; 
        }                       
        
        var rowIdx, colIdx;        
        var output = [];
        
        // Create Column Names
        var colNames = [];        
        for (colIdx = 0; colIdx < dataArray.columnNames.length; colIdx++) {
          if (dataArray.columnNames[colIdx].startsWith('Adjusted')) {
            continue;
          }          
          colNames.push(dataArray.columnNames[colIdx]);
        }
        output.columnNames = colNames;
        
        // Create Adjusted Versions
        for (rowIdx = 0; rowIdx < dataArray.length; rowIdx++) {
          var element = dataArray[rowIdx];
          var adjusted = {};
          
          var scale = element['Adjusted Close'] / element.Close;
          if (Number.isNaN(scale)) continue; 

          // Copy Date
          adjusted[colNames[0]] = element[colNames[0]];
          
          // Copy Scaled Others
          for (colIdx = 1; colIdx < colNames.length; colIdx++) {
            adjusted[colNames[colIdx]] = scale * element[colNames[colIdx]];
          }          
          
          output.push(adjusted);
        }
        
        return output;
      }
      
      this.getData = function(databaseCode, dataSetCode) {
        var url = _this.createDataUrl.apply(_this, arguments);
        return $http.get(url)
          .then(function(data) {
            return _this.getDataArray(data.data.dataset_data);
          }, function (error) {
            return {error: error.statusText, status: error.status};
          });
      }
    }]);
})();