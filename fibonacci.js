var jdunkerley = {};

jdunkerley.fibonacci = function() {
	var cache = {};
	 cache[0] = 0;
	 cache[1] = 1;

	function calc(n){

		if ( n < 0 ) {

			return null;

		}

		if ( typeof cache[n] !== "undefined" ) {

			return cache[n];

		}

		cache[n] = arguments.callee(n-1) + arguments.callee(n-2);
		log( n, " = ", cache[n]);
		return cache[n];

	};

	return {
		get: calc
	};

}();

assert(jdunkerley.fibonacci.get(3) == 2, "f3 = 2");