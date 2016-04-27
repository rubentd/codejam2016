process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = '';

process.stdin.on('data', (chunk) => {
	input += chunk;
});

process.stdin.on('end', () => {
	var parts = input.split('\n');
  var T = parseInt(parts[0]);
  for(var i = 0; i < T; i++){
    var stack = parts[i + 1].split('');
    var answer = solveCase(stack);
    console.log(`Case #${i+1}: ${answer}`);
  }
});

solveCase = (stack) => {
	var flips = 0;
	var n = stack.length;
	while(!allFlipped(stack)){
		var ln = lastNegative(stack);
		if(stack[0] === '-'){
			stack = flip(stack, (ln+1));
		}else{
			stack = flipTopPlus(stack);
		}
		flips++
	}
	return flips;
}

//get last position with a negative pancake
lastNegative = (stack) => {
	var n = stack.length;
	for(var i = n-1; i >= 0; i--){
		if(stack[i] === '-'){
			return i;
		}
	}
	return -1;
}

// flip all consecutive plus on the top
flipTopPlus = (stack) => {
	var n = stack.length;
	for(var i = 0; i < n; i++){
		if(stack[i] === '+'){
			stack[i] = '-';
		}else{
			return stack;
		}
	}
}

// flip stack
flip = (stack, n) => {
	var N = stack.length;
	var flipped = stack.slice(0, n);
	var notFlipped = stack.slice(n, N);
	flipped = flipped.reverse();
	var m = flipped.length;
	for(var i = 0; i < m; i++){
		if(flipped[i] === '+'){
			flipped[i] = '-';
		}else{
			flipped[i] = '+';
		}
	}
	return flipped.concat(notFlipped);
}

// check if all of the pancakes are flipped
allFlipped = (stack) => {
	return stack.indexOf('-') === -1;
}
