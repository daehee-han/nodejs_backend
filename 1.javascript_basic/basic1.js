for (var i = 0; i < 5; i++) {
    console.log('hello');
}
// Object
var obj3 = {
    age: 35,
    name: 'handol',
    height: 170.5,
    addr: {
        city: 'Seoul',
        dong: 'Daechi',
        bungi: 10
    }
};
// Callback function
setTimeout(function(){
	console.log(obj3);
}, 1000);
