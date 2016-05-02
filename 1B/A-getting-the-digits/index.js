process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = '';
var stringDigits = ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN']


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
	// find zeroes
	while(word.indexOf('Z') !== -1){
		digits.push(0);
		word = removeDigit('ZERO', word);
	}
	// find sixes
	while(word.indexOf('X') !== -1){
		digits.push(6);
		word = removeDigit('SIX', word);
	}
	// find EIGHTs
	while(word.indexOf('G') !== -1){
		digits.push(8);
		word = removeDigit('EIGHT', word);
	}
	// find TWOs
	while(word.indexOf('W') !== -1){
		digits.push(2);
		word = removeDigit('TWO', word);
	}
	// find threes
	while(word.indexOf('H') !== -1 && word.indexOf('R') !== -1){
		digits.push(3);
		word = removeDigit('THREE', word);
	}
	// find sevens
	while(word.indexOf('S') !== -1){
		digits.push(7);
		word = removeDigit('SEVEN', word);
	}
	// find fours
	while(word.indexOf('R') !== -1){
		digits.push(4);
		word = removeDigit('FOUR', word);
	}
	// find fives
	while(word.indexOf('V') !== -1){
		digits.push(5);
		word = removeDigit('FIVE', word);
	}
	// find ones
	while(word.indexOf('O') !== -1){
		digits.push(1);
		word = removeDigit('ONE', word);
	}
	// find ninves
	while(word.indexOf('N') !== -1){
		digits.push(9);
		word = removeDigit('NINE', word);
	}
	digits = digits.sort(sortNumber);
	return digits;
}

function removeDigit(digit, word){
	var digitLetters = digit.split('');
	digitLetters.forEach((let) => {
		word = word.replace(let, '-');
	});
	return word;
}

function sortNumber(a,b) {
    return a - b;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
