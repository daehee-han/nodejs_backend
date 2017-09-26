var redis   = require('redis');
var client = redis.createClient(6379,'lab.slowcampus.com');


client.on("error", function (err) {
    console.log("Error " + err);
});

client.set('k1', 'hello !!');
client.get('k1', function (err, reply) {
	if (!err) {
		console.log('k1', reply);
	} else {
		console.log('Error', err);
	}
});


var k2 = 'k2';
var lists = ['aaa', 'bbb', 'ccc'];
/* LPUSH key : 리스트 타입 데이타의 새 원소를 왼쪽에서 push 함
	Left push + Right pop == Queue 형태가 됨. FIFO (first-in, first-out)
*/
for(var i=0; i<lists.length; i++) {
	client.lpush(k2, lists[i]);
	console.log('LPUSH', lists[i]);	
}

/* LLEN key : 리스트 타입 데이타의 길이를 구하여, 그 갯수만큼 POP수행.
   모든 데이타를 pop하는 것임.
 */
client.llen(k2, function(err, reply) {
	if (!err) {
		console.log(k2, "LEN", reply);
		for(var i=0; i<reply; i++) {
			/* RPOP key : 리스트 타입 데이타를 오른쪽에서부터 pop */	
			client.rpop(k2, function (err, reply2) {
				console.log(k2, "RPOP", reply2);
			});
		}
	}
});