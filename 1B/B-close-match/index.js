process.stdin.resume();
process.stdin.setEncoding('ascii');

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

function solve(score, i){
	var answer = score;
	var C = score.split(' ')[0];
	var J = score.split(' ')[1];
	var diff = Infinity;
	var CLimit = Math.pow(10, (C.match(/\?/g) || []).length) - 1;
	var JLimit = Math.pow(10, (J.match(/\?/g) || []).length) - 1;
	var Ccandidate = 0;
	var Jcandidate = 0;

	C = C.split('');
	J = J.split('');
	// simplify problem
	for(var j = 0; j < C.length; j++){
		// compare
		if(C[j] === '?' && J[j] !== '?'){
			 C[j] = J[j];
		}
		if(C[j] !== '?' && J[j] === '?'){
			 J[j] = C[j];
		}
	}
	C = C.join('');
	J = J.join('');

	var c = 0;
	var j = 0;

	if(C.indexOf('?') === -1 && J.indexOf('?') === -1){
		console.log(`Case #${i}: ${C} ${J}`);
		return;
	}

	while(c <= CLimit && j <= JLimit){

		var tryC = parseInt(fillBlanks(C, c, CLimit));
		var tryJ = parseInt(fillBlanks(J, j, JLimit));

		var newDiff = Math.abs(tryC - tryJ);
		if(newDiff < diff){
			diff = newDiff;
			Ccandidate = c;
			Jcandidate = j;
		}

		if(tryC > tryJ){
			j++;
		}else{
			c++;
		}

	}

	C = fillBlanks(C, Ccandidate, CLimit);
	J = fillBlanks(J, Jcandidate, JLimit);

	console.log(`Case #${i}: ${C} ${J}`);

}

function fillBlanks(score, number, limit){
	var NArray = convertToArray(number, limit);
	// replace the ? with candidates
	for(var i = 0; i < NArray.length; i++){
		score = score.replace('?', NArray[i]);
	}
	return score;
}

function convertToArray(number, limit){
	var number = String(number);
	var len = String(limit).length;
	var arr = [];
	if(number.length < len){
		var n = (len - number.length);
		for(var i = 0; i < n; i++){
			// fill in with zeroes
			arr.push(0);
		}
	}
	for(var i = 0; i < number.length; i++){
		arr.push(number[i]);
	}
	return arr;
}
