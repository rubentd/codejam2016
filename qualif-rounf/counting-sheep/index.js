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
    var N = parseInt(parts[i + 1]);
    var answer = solveCase(N);
    console.log(`Case #${i+1}: ${answer}`);
  }
});

solveCase = (N) => {
  if(N == 0){
    return 'INSOMNIA';
  }
  
  var digits = [];
  var keepGoing = true;
  var index = 1;
  while(keepGoing){
    var M = String(N * index);
    for(var j = 0; j < M.length; j++){
      var digit = M[j];
      if(digits.indexOf(digit) == -1){
        digits.push(digit);
      }
    }
    if(digits.length == 10){
      keepGoing = false;
      return M;
    }
    index ++;
  }

}
