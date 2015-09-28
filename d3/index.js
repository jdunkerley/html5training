(function() {
  'use strict';

  var svg = d3.select('svg');
  var width = svg.attr('width');
  var height = svg.attr('height');

  // Create Linear Scale
  var x = d3.scale.linear()
    .range([0, height]);

  d3.tsv('data.tsv', type, function (error, data) {
    x.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    var barWidth = width / data.length;

    // Div Based Chart
    var bars = svg.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function (d, i) {
        return 'translate(' + i * barWidth + ', 0)';
      });

    bars.append('rect')
      .attr({
        y: function (d) { return height - x(d.value); },
        height: function (d) {
          return x(d.value);
        },
        width: barWidth - 1
      });

    bars.append('text')
      .attr({
        x: barWidth / 2,
        y: function (d) { return height - x(d.value); },
        dy: '12px'
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