export default function(x) {
	if (x && x.inspect) {
        console.log(x.inspect());
	} else {
		console.log(x);
	}
    return x;
}
