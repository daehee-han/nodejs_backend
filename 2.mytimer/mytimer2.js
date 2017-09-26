/*
정의한 함수 자체를 exports에 대입한 경우.
*/
module.exports = function MyTimer() {
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

