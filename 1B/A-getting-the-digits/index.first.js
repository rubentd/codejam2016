process.stdin.resume();
process.stdin.setEncoding('ascii');

var digitStrings = [
	{
		n: 7,
		str: 'SEVEN'
	},
	{
		n: 8,
		str: 'EIGHT'
	},
	{
		n: 3,
		str: 'THREE'
	},
	{
		n: 9,
		str: 'NINE'
	},
	{
		n: 0,
		str: 'ZERO'
	},
	{
		n: 4,
		str: 'FOUR'
	},
	{
		n: 5,
		str: 'FIVE'
	},
	{
		n: 6,
		str: 'SIX'
	},
	{
		n: 7,
		str: 'ONE'
	},
	{
		n: 2,
		str: 'TWO'
	}
];

var input = '';

process.stdin.on('data', (chunk) => {
	input += chunk;
});

process.stdin.on('end', () => {
	var parts = input.split('\n');
	var T = parts[0];
	for(var i = 1; i <= T; i++ ){
		solve(parts[i], i);
	}

});

function solve(word, i){
	var digits = [];
	digits = findDigits(word);
	console.log(`Case #${i}: ${digits.join('')}`);
}

function findDigits(word){
	var digits = [];
	digitStrings.forEach((digit, i) => {
		var cont = contains(digit.str, word);
		while(cont !== null){
			word = cont;
			cont = contains(digit.str, word);
			digits.push(digit.n);
		}
	});
	digits = digits.sort(sortNumber);
	return digits;

}

function contains(digit, word){
	var digitLetters = digit.split('');
	var wordLetters = word.split('');
	found = 0;
	digitLetters.forEach((let) => {
		var index = wordLetters.indexOf(let);
		if(index != -1){
			wordLetters[index] = '-';
			found++;
		}
	});
	if(found == digitLetters.length){
		return wordLetters.join('');
	}
	return null;
}

function sortNumber(a,b) {
    return a - b;
}
