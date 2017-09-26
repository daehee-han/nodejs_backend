var id;
var n=1;
// hello를 출력하는 함수를 1초 마다 수행하도록 요청
id = setInterval(function() {console.log(n++, "hello !");}, 1000);

function stopIt() {
  clearInterval(id);
}
// 10초
setTimeout(stopIt, 1000*5+100);

// 디버깅
console.log(stopIt);
const util = require('util');
console.log(util.inspect(stopIt, true, null));

