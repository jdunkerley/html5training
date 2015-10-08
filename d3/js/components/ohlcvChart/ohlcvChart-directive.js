(function() {
	'use strict';

	function mainChartCreate(svgPanel) { 				
		var output = {};
		
		output.panel = svgPanel;
		output.data = function() { return output.panel.datum(); };
		
		output.candlestick = fc.series.candlestick()
			.xValue(function(d,i) { return d.Date; })
			.yOpenValue(function(d,i) { return d.Open; })
			.yHighValue(function(d,i) { return d.High; })
			.yLowValue(function(d,i) { return d.Low; })
			.yCloseValue(function(d,i) { return d.Close; });
			
		var crossHairData = [];
		output.crosshairs = fc.tool.crosshair()
			.xLabel('')
            .yLabel('');
			
		output.multi = fc.series.multi()
            .series([
				fc.annotation.gridline(), 
				output.candlestick,
				output.crosshairs
			])
			.mapping(function(series) {
				if (series === output.crosshairs) {
					return crossHairData;
				}
				return output.data();
			});

        output.chart = fc.chart.linearTimeSeries()
            .xTicks(0)
            .yNice().yTicks(4)
            .plotArea(output.multi);
			
		output.dataSet = function(data, dateDomain) {			
			var yDomain = fc.util.extent(data, ['High', 'Low']);
			
			output.chart
				.xDomain(dateDomain)
				.yDomain(yDomain);
					
			output.crosshairs
				.snap(fc.util.seriesPointSnap(output.candlestick, output.data()))
							
			output.panel
				.datum(data)
				.call(output.chart);	
		};
			
		return output;
	}
	
	function volumeChartCreate(svgPanel) {
		var output = {};
		
		output.panel = svgPanel;
		
		output.bar = fc.series.bar()
			.xValue(function(d,i) { return d.Date; })
			.yValue(function(d,i) { return d.Volume; });
		
		output.multi = fc.series.multi()
            .series([
				fc.annotation.gridline(), 
				output.bar,
				// output.crosshairs
			]); 		
		
		output.chart = fc.chart.linearTimeSeries()
			.yNice().yTicks(2)
			.plotArea(output.multi);
			
		output.dataSet = function(data, dateDomain) {
			output.chart
				.xDomain(dateDomain)
				.yDomain([0, d3.max(data, function(d) { return d.Volume; })])
			output.panel
				.datum(data || [])
				.call(output.chart);	
		};
		
		return output;
	}

	function createPanelSVG(container, width, height) {
		return container
			.append('svg')
			.attr({
				width: width,
				height: height
			});
	}
	
	function setData(panels, data) {
		var dateDomain = fc.util.extent(data, 'Date');
		
		for (var idx = 0; idx < panels.length; idx++) {
			panels[idx].dataSet(data, dateDomain);			
		}
	}
	
	angular.module('d3Test.ohlcvChart')
		.directive('d3fcChart', [function() {
		return {
			restrict: 'E',
			scope: {
				data: '='
			},
			link: function(scope, element, attribs) {
				var container = d3.select(element[0]);
				
				// Create Chart Panels
				var width = attribs.width || 1140;
				var height = attribs.height || 800;
				var panels = [
					mainChartCreate(createPanelSVG(container, width, height * 0.8)),
					volumeChartCreate(createPanelSVG(container, width, height * 0.2)),
				];
									
				// This will be called on data set
				scope.render = function(data) {
					setData(panels, data || []);					
				};
				
				scope.$watch('data', function() {
					scope.render(scope.data);
				}, true);
			}
		};
	}]);
})();
