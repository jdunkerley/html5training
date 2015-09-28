(function() {
  'use strict';

  var body = d3.select('body');
  var data = [4, 8, 15, 16, 23, 42];

  var width = 420;
  var barHeight = 20;

  var svg = body.append('svg')
    .classed('chart', true)
    .attr({
      width: width,
      height: data.length * barHeight
    });


  // Create Linear Scale
  var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, width]);

  // Div Based Chart
  var bars = svg.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr({
      transform: function (d, i) {
        return 'translate(0,' + i * barHeight + ')';
      }});

  bars.append('rect')
    .attr({
      width: x,
      height: barHeight - 1
    });

  bars.append('text')
    .attr({
      x: function(d) { return x(d) - 3; },
      y: barHeight / 2,
      dy: '3px'
    })
    .text(function(d) { return d; });

  bars.exit().remove();
})();