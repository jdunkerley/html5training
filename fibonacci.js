var jdunkerley = {};

jdunkerley.fibonacci = function() {
	var cache = {};
	 cache[0] = 0;
	 cache[1] = 1;

	function calc(n){

		if ( n < 0 ) {

			return null;

		}

		if ( typeof cache[n] !== 'undefined' ) {

			return cache[n];

		}

		cache[n] = arguments.callee(n-1) + arguments.callee(n-2);
		console.log( n + ' = ' + cache[n]);
		return cache[n];

	};

	return {
		get: calc
	};

}();

console.log( 'f10 = ' + jdunkerley.fibonacci.get(10));