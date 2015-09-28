(function() {
  'use strict';

  var body = d3.select('body');
  var data = [4, 8, 15, 16, 23, 42];

  var width = 420;
  var barHeight = 20;

  var svg = body.append('svg')
    .classed('chart', true)
    .attr({
      width: width + 30,
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

  bars.filter(function(d,i) { return i > 0; })
    .append('line')
    .style('stroke', 'grey')
    .attr({
      x1: function(d,i) { return x(data[i]); },
      y1: -barHeight / 2,
      x2: function(d) { return x(d); },
      y2: barHeight / 2
    });

  bars.append('text')
    .attr({
      x: function(d) { return x(d) + 3; },
      y: barHeight / 2,
      dy: '3px'
    })
    .text(function(d, i) { return i == 0 ? '' : '+' + (d - data[i-1]); });
})();