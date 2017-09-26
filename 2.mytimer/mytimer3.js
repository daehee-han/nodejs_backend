/*
정의한 함수 자체를 exports에 대입한 경우.
*/

function MyTimer() {
}

MyTimer.prototype.stop =

MyTimer.prototype.run = function(callback, intervalSec, durationSec) {
  var intvId = setInterval(callback, intervalSec*1000);
  function stop() {
    console.log('STOP');
    clearInterval(intvId);
  };
  setTimeout(stop, durationSec*1000);
}

module.exports = {
  MyTimer: MyTimer
};

