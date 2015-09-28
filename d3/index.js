(function() {
  'use strict';

  var svg = d3.select('svg');
  var margin = {top: 20, right: 30, bottom: 30, left: 40};
  var width = svg.attr('width') - margin.left - margin.right;
  var height = svg.attr('height') - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.01);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

  // Create Linear Scale
  var y = d3.scale.linear()
    .range([0, height]);

  d3.tsv('data.tsv', type, function (error, data) {
    x.domain(data.map(function(d) { return d.name; }));

    svg.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + margin.left + ',' + (svg.attr('height') - margin.bottom) + ')')
      .call(xAxis);

    y.domain([0, d3.max(data, function (d) {
      return d.value;
    })]);

    // Div Based Chart
    var bars = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function (d) {
        return 'translate(' + x(d.name) + ', 0)';
      });

    bars.append('rect')
      .attr({
        y: function (d) { return height - y(d.value); },
        height: function (d) {
          return y(d.value);
        },
        width: x.rangeBand()
      });

    bars.append('text')
      .attr({
        x: x.rangeBand() / 2,
        y: function (d) { return height - y(d.value); },
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