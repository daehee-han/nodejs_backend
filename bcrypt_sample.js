var bcrypt = require('bcrypt-nodejs');
var p1 = bcrypt.hashSync('hello', bcrypt.genSaltSync(10));
var p2 = bcrypt.hashSync('hello', bcrypt.genSaltSync(10));

console.log(p1);
console.log(p2);

console.log(bcrypt.compareSync('hello', p1));
console.log(bcrypt.compareSync('hello', p2));
