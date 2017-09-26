var _ = require('lodash');

var numbers = [1,2,3,4,5,6,7,8,9,10];

var res1 = _.map(numbers, function(n) {
  return n*n;
});
console.log('map()', res1);

var res2 = _.reduce(numbers, function(n1, n2) {
  return n1 + n2;
});
console.log('reduce()', res2);

var obj1 = {
  name: 'han',
  age: 20,
  height: 163,
  phone: '010-2101-0255'
};

var obj2 = {
  age: 20,
  height: 174,
  sex: 'male',
  address: 'Gangnam',
};

console.log(obj1);
/* omit(), pick() */
console.log(_.omit(obj1, ['phone']));
console.log(_.pick(obj1, ['name', 'phone']));

/* merge() */
console.log('MERGE()', _.merge(obj1, obj2));


