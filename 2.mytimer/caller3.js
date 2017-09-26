var mytimer = require('./mytimer3');
// 디버깅
const util = require('util')
console.log(util.inspect(mytimer.MyTimer, true, null))

var a = new mytimer.MyTimer();

a.run(function() {
  console.log('Hello AAA !');
}, 1, 5);


