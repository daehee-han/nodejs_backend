function MyTimer() {
  var intvId = 0;

  this.stop = function() {
    console.log('STOP');
    clearInterval(intvId);
  };

  this.run = function(callback, intervalSec, durationSec) {
    intvId = setInterval(callback, intervalSec*1000);
    setTimeout(this.stop, durationSec*1000);
  };
}

a = new MyTimer();
b = new MyTimer();

a.run(function() {
  console.log('Hello AAA !');
}, 1, 10);

b.run(function() {
  console.log('Hello BBB !');
}, 1, 5);

setTimeout(a.stop, 6*1000);

// 디버깅
console.log(a);
const util = require('util')
console.log(util.inspect(a, true, null))
