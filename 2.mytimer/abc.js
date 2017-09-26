var a = {
  name: 'daehee',
  age: 40
};

function b() {
  console.log('I am a function');
}

console.log(a);
console.log(b.name);
console.log('----');
const util = require('util')
console.log(util.inspect(a, true, null));
console.log(util.inspect(b, true, null));
