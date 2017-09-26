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

var byAddress = _.groupBy(users, 'address');
console.log(byAddress);
console.log(byAddress['Bundang']);

var bySex = _.groupBy(users, 'sex');
console.log(bySex);
console.log(bySex['female']);

