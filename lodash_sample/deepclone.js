var _ = require('lodash');

var a = {
  name: 'handol',
  obj: {
    type: 'int',
    child: {
      name: 'abc',
      age: 10,
      friend: [1,2,3]
    }
  }
};

var b = _.cloneDeep(a);
console.log(b);
console.log(b.obj.child);
