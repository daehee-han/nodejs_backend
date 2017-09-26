module.exports = {
A: function() {
  console.log('AAA');
  module.exports.B();
}
,
B: function() {
  //module.exports.A();
  console.log('BBB');
}
};


if (require.main == module) {
  var t = require('./test_module');
  t.A();
}
