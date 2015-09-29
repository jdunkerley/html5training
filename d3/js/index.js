(function() {
  'use strict';

  var svg = d3.select('svg');
  var margin = {top: 20, right: 30, bottom: 30, left: 40};

  var chart = svg.append('g').attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  var width = svg.attr('width') - margin.left - margin.right;
  var height = svg.attr('height') - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], 0.1);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom');

  // Create Linear Scale
  var y = d3.scale.linear()
    .range([height, 0]);

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .ticks(10, '%');

  d3.tsv('letters.tsv', type, function (error, data) {
    x.domain(data.map(function(d) { return d.letter; }));

    chart.append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(' + 0 + ',' + height + ')')
      .call(xAxis);

    y.domain([0, d3.max(data, function (d) {
      return d.frequency;
    })]);

    chart.append('g')
      .attr('class', 'y axis')
      .call(yAxis)
      .append('text')
      .attr({
        transform: 'rotate(-90)',
        y: 6,
        dy: '0.71em'
      })
      .style('text-anchor', 'end')
      .text('Frequency');

    // Div Based Chart
    var bars = chart
      .selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr({
        class: 'bar',
        y: function (d) { return y(d.frequency); },
        height: function (d) {
          return height - y(d.frequency);
        },
        x: function (d) { return x(d.letter); },
        width: x.rangeBand()
      });

    //bars.exit().remove();
  });

  function type(d) {
    d.frequency = +d.frequency; // coerce to number
    return d;
  }
})();