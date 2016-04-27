process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = '';

process.stdin.on('data', (chunk) => {
	input += chunk;
});

process.stdin.on('end', () => {
	var parts = input.split('\n');
	var N = parseInt(parts[1].split(' ')[0]);
	var J = parseInt(parts[1].split(' ')[1]);

	var coinjams = [];

	var candidate = '0';
	while(coinjams.length < J){
		var formatted = completeWithZeroes(candidate, N-2);
		formatted = '1' + formatted + '1';

		var sds = isCoinjam(formatted);
		if(sds !== null){
			coinjams.push({
				number: formatted,
				divisors: sds
			});
		}
		candidate = next(candidate);
	}
	console.log('Case #1:');
	printCoinjams(coinjams);

});

printCoinjams = (coinjams) => {
	var n = coinjams.length
	for(var i = 0; i < n; i++){
		console.log(`${coinjams[i].number} ${coinjams[i].divisors.join(' ')}`);
	}
}

// find the smallest divisor of a number, (if I cant find it Quick, fuck it)
smallestDivisor = (number) => {
	for(var i = 2; i <= number; i++){
		if(i > 20000){
			return number;
		}
		if(number % i === 0){
			return i;
		}
	}
}

// sum 1 to this binary number
next = (a) => {
	var intDec = parseInt(String(a), 2);
	return Number(intDec + 1).toString(2);
}

// check if number is a coinjam
isCoinjam = (numString) => {
	var smallestDivisors = [];
	var n = numString.length;
	if(numString[0] !== '1' || numString[n-1] !== '1'){
		return null;
	}
	for(var base = 2; base <= 10; base++){
		var numberInBase = parseInt(numString, base);
		var sd = smallestDivisor(numberInBase);
		if(sd < Number(numberInBase)){
			smallestDivisors.push(sd);
		}else{
			return null;
		}
	}
	return smallestDivisors;
}

// add zeroes to the left until desired length
completeWithZeroes = (numString, n) => {
	while(numString.length < n){
		numString = '0' + numString;
	}
	return numString;
}
