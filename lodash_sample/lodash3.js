var _ = require('lodash');

var users = [
  {
    name: 'han',
    age: 20,
    height: 163,
    phone: '010-2101-0255',
    sex: 'female',
    address: 'Bundang'
  },
  {
    name: 'kim',
    age: 25,
    height: 174,
    phone: '010-2101-0001',
    sex: 'male',
    address: 'Gangnam',
  },
  {
    name: 'park',
    age: 31,
    height: 174,
    sex: 'female',
    phone: '010-2101-0002',
    address: 'Gangnam',
  },
  {
    name: 'lee',
    age: 35,
    height: 161,
    sex: 'male',
    phone: '010-2101-0003',
    address: 'Bundang',
  }
];


var byPhone = _.keyBy(users, 'phone');
console.log(byPhone['010-2101-0255']);

var byAge = _.groupBy(users, function(user) {
  return user.age;
});
console.log('byAge', Object.keys(byAge).length);
console.log(byAge[35]);

var byAge2 = _.groupBy(users, function(user) {
  return Math.floor(user.age / 10)*10;
});
console.log('byAge2', Object.keys(byAge2).length);
console.log(byAge2[30]);