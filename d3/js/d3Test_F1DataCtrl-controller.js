(function() {
  'use strict';

  angular.module('d3Test.f1Data', [

  ])
    .controller('f1DataCtrl', ['$http', function($http) {
      var self = this;

      this.valueField = 'points';
      this.valueFields = ['points', 'wins'];

      this.classField = 'constructor';

      this.data = [
        {name: 'Lewis Hamilton', country: 'GBR', constructor: 'Mercedes', wins: 8, points: 277},
        {name: 'Nico Rosberg', country: 'GER', constructor: 'Mercedes', wins: 3, points: 229},
        {name: 'Sebastian Vettel', country: 'GER', constructor: 'Ferrari', wins: 3, points: 218},
        {name: 'Kimi Raikkonen', country: 'FIN', constructor: 'Ferrari', wins: 0, points: 119},
        {name: 'Valtteri Bottas', country: 'FIN', constructor: 'Williams', wins: 0, points: 111},
        {name: 'Felipe Massa', country: 'BRA', constructor: 'Williams', wins: 0, points: 97},
        {name: 'Daniel Ricciardo', country: 'AUS', constructor: 'Red Bull', wins: 0, points: 73},
        {name: 'Daniil Kvyat', country: 'RUS', constructor: 'Red Bull', wins: 0, points: 66},
        {name: 'Romain Grosjean', country: 'FRA', constructor: 'Lotus', wins: 0, points: 44},
        {name: 'Sergio Perez', country: 'MEX', constructor: 'Force India', wins: 0, points: 39},
        {name: 'Nico Hulkenberg', country: 'GER', constructor: 'Force India', wins: 0, points: 38},
        {name: 'Max Verstappen', country: 'NED', constructor: 'Toro Rosso', wins: 0, points: 32},
        {name: 'Felipe Nasr', country: 'BRA', constructor: 'Sauber', wins: 0, points: 17},
        {name: 'Pastor Maldonado', country: 'VEN', constructor: 'Lotus', wins: 0, points: 16},
        {name: 'Carlos Sainz Jr.', country: 'ESP', constructor: 'Toro Rosso', wins: 0, points: 12},
        {name: 'Fernando Alonso', country: 'ESP', constructor: 'McLaren', wins: 0, points: 11},
        {name: 'Marcus Ericsson', country: 'SWE', constructor: 'Sauber', wins: 0, points: 9},
        {name: 'Jenson Button', country: 'GBR', constructor: 'McLaren', wins: 0, points: 6},
        {name: 'Roberto Merhi', country: 'ESP', constructor: 'Manor', wins: 0, points: 0},
        {name: 'Will Stevens', country: 'GBR', constructor: 'Manor', wins: 0, points: 0},
        {name: 'Alexander Rossi', country: 'USA', constructor: 'Manor', wins: 0, points: 0},
      ];
    }]);
})();