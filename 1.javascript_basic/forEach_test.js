var arr = [11,21,31];
var arr2 = ['aaa', 'ccc', 'bbb'];
var arrOfObj = [{name:'han'}, {name:'kim'}, {name:'park'}];
var obj3 = {age: 35, name: 'handol', height: 170.5, addr: {city: 'Seoul', dong:'Daechi', bungi: 10} };

arr.forEach(function(elem) {
  console.log(elem);
});

arrOfObj.forEach(function(elem) {
  console.log(elem);
});

arr.forEach(function(elem) {
  elem = 9;
  /* --> Not changed */
});

console.log(arr);
arr.push(100);
console.log(arr);

arr2.forEach(function(elem) {
  elem = 'xxx';
  /* --> Not changed */
});

console.log(arr2);
arr2.push('hhh');
console.log(arr2);

arrOfObj.forEach(function(elem) {
  elem.name = 'jee';
  /* --> Changed */
});

console.log(arrOfObj);

function modify_array(_arr) {
  _arr[0] = 10;
  _arr[1] = 10;
  _arr[2] = 10;
}
modify_array(arr);
console.log(arr);


console.log(obj3);
var d = Object.keys(obj3);
console.log(d);

for (var key in obj3) {
  var val = obj3[key];
  console.log(key, '-->', val);
};
