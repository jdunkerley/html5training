(function() {
  'use strict';

  var body = d3.select('body');

  var width = 420;
  var barHeight = 20;

  var svg = body.append('svg')
    .classed('chart', true)
    .attr('width', width);

  // Create Linear Scale
  var x = d3.scale.linear()
    .range([0, width]);

  d3.tsv('data.tsv', type, function (error, data) {
    svg.attr('height',  data.length * barHeight)
    x.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    // Div Based Chart
    var bars = svg.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function (d, i) {
        return 'translate(0,' + i * barHeight + ')';
      });

    bars.append('rect')
      .attr({
        width: function (d) {
          return x(d.value);
        },
        height: barHeight - 1
      });

    bars.append('text')
      .attr({
        x: function (d) {
          return x(d.value) - 3;
        },
        y: barHeight / 2,
        dy: '3px'
      })
      .text(function (d) {
        return d.name;
      });

    bars.exit().remove();
  });

  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }
})();