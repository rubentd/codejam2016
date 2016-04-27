process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = '';

process.stdin.on('data', (chunk) => {
	input += chunk;
});

process.stdin.on('end', () => {
	console.log(input);
});
