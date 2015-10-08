(function() {
	'use strict';
	
	angular.module('d3Test.ohlcvChart')
	  .directive('d3fcOHLCVChart', [function() {
		  return {
			  restrict: 'E',
			  scope: {
				  data: '='
			  },
			  link: function(scope, element, attribs) {
				// Create SVG Element (read width and height from attributes)
          		var svg = d3.select(element[0]).append('svg')
            		.attr({
						width: attribs.width || 960,
						height: attribs.height || 480
					});
					
				// Define Margins
				var margin = {top: 10, right: 60, bottom: 60, left: 45};
          		var width = svg.attr('width') - margin.left - margin.right;
          		var height = svg.attr('height') - margin.top - margin.bottom;
				  
				
			  }
		  }
	  }])
})();
