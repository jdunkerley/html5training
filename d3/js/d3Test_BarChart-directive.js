(function() {
  'use strict';

  angular.module('d3Test.barChart',[

  ])
    .directive('d3BarChart', [function() {
      return {
        restrict: 'E',
        scope: {
          data: '=',
          nameField: '=',
          valueField: '=',
          classField: '='
        },
        link: function(scope, element, attr) {
          // Create SVG Element (read width and height from attributes)
          var svg = d3.select(element[0]).append('svg')
            .attr({
              width: attr.width || 960,
              height: attr.height || 480
            });

          // Define Margins and Width, Height
          var margin = {top: 20, right: 30, bottom: 30, left: 45};
          var width = svg.attr('width') - margin.left - margin.right;
          var height = svg.attr('height') - margin.top - margin.bottom;

          // Create Chart
          var chart = svg.append('g')
            .attr({
              transform: 'translate(' + margin.left + ',' + margin.top + ')'
            });
          chart.append('rect')
            .attr({
              x: 0,
              y: 0,
              width: width,
              height: height,
              class: 'chart bg'
            });

          // Define Axis
          var x = d3.scale.ordinal().rangeRoundBands([0, width], 0.1);
          var y = d3.scale.linear().range([height, 0]);
          var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');
          var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(10);

          var firstRender = true;

          // Connect To Data
          scope.render = function(data, scope) {
            x.domain(data.map(function(d) { return d[scope.nameField || 'name']; }));
            if (firstRender) {
              chart.append('g')
                .attr({
                  class: 'x axis',
                  transform: 'translate(0,' + height + ')'
                });
            }
            chart.select('g.x.axis').call(xAxis);

            y.domain([0, d3.max(data, function(d) {
              return d[scope.valueField || 'value'];
            })]);
            if (firstRender) {
              chart.append('g')
                .attr('class', 'y axis')
                .append('text')
                .attr({
                  class: 'label',
                  transform: 'rotate(-90)',
                  y: -margin.left,
                  dy: '0.71em'
                })
                .style('text-anchor', 'end');
            }

            chart.select('g.y.axis')
              .transition()
              .duration(750)
              .call(yAxis)
              .select('text.label')
              .text(scope.valueField || 'value');

            var bars = chart
              .selectAll('.bar')
              .data(data);

            // Enter - Add New Points
            bars.enter().append('rect')
              .attr({
                class: function(d) { return 'bar ' + (scope.classField ? d[scope.classField].toLowerCase().replace(/ /g,'-') : ''); }
              });

            // Update
            bars
              .transition()
              .duration(750)
              .attr({
                y: function(d) {
                  return y(d[scope.valueField || 'value']);
                },
                height: function(d) {
                  return height - y(d[scope.valueField || 'value']);
                },
                x: function(d) {
                  return x(d[scope.nameField || 'name']);
                },
                width: x.rangeBand()
              });

            // Exit - Remove Dead Points
            bars.exit().remove();

            firstRender = false;
          };

          // Wire Up Watch
          scope.$watch('data', function() {
            scope.render(scope.data, scope);
          }, true);

          scope.$watch('valueField', function() {
            scope.render(scope.data, scope);
          });
        }
      };
    }]);
})();