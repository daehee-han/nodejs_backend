var mytimer = require('./mytimer2');
a = new mytimer();

a.run(function() {
  console.log('Hello AAA !');
}, 1, 5);


// 디버깅
const util = require('util')
console.log(util.inspect(a, true, null))
