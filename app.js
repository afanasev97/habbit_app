var log = console.log;

function iterable() {
	let i = 0;
	function getValue() {
	    return i;
	};
	function next() {
		i++;
        return i;
	};
	function previous() {
		i--;
        return i;
	};
	function reset() {
		i = 0;
		return i;
	};
	return {
		getValue,
		next,
		previous,
        reset
	}
};

const it = iterable();
log(it.getValue());
it.next();
log(it.getValue());
log(it.i)