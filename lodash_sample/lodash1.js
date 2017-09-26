var _ = require('lodash');

var aplist = [
  {
    name: 'abc',
    size: 20,
    date: '2010-10-20'
  },
  {
    name: 'ccc',
    size: 10,
    date: '2015-11-20'
  },
  {
    name: 'ccc2',
    size: 40,
    date: '2015-11-20'
  },
  {
    name: 'bbb',
    size: 40,
    date: '2017-03-20'
  },
  {
    name: 'bbb2',
    size: 41,
    date: '2017-03-20'
  },
  

];

for(var i=0; i<aplist.length; i++) {
  console.log(aplist[i]);
}

console.log('----');

_.forEach(aplist, function(ap) {
  console.log(ap);
});

var filtered1 = _.filter(aplist, function(ap) {
  return (ap.size < 30);
});

_.forEach(filtered1, function(ap) {
  console.log('filtered1', ap);
});

var sizeSum = _.sumBy(aplist, 'size');
console.log('sizeSum', sizeSum);

var uniqListByDate = _.uniqBy(aplist, 'date');
console.log('uniqListByDate', uniqListByDate.length);

