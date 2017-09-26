function A(name) {
  this.name = name;
  this.vars = {}
}

A.prototype.add = function (k, v) {
  this.vars[k] = v;
}
A.prototype.prn = function () {
  console.log(this.name, ':',  this.vars);
}

var a = new A('han');
a.add('age', 10);
a.add('addr', 'xyz');
a.prn();

console.log('FUNC', (! Object.getPrototypeOf(a).add));
console.log('FUNC', (! Object.getPrototypeOf(a).add2));
console.log(a.prn === A.prototype.prn);

var old = Object.getPrototypeOf(a).add;
Object.getPrototypeOf(a).add = function (k, v) {
  this.vars[k] = v * 2;
  //old.call(this, k, v);
}

a.add('age2', 20);
a.add('addr2', 'xyz');
a.prn();
