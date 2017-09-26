var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var knex = require('knex')({
    debug: false,
    client: 'mysql',
    connection: {
      host: 'slow2.clrrpqxdnnah.ap-northeast-2.rds.amazonaws.com',
      port: 3306,
      user: 'slow',
      password: 'slow2017',
      database: 'slow',
      timezone: 'Asia/Seoul'
    },
    pool: {
      min: 0,
      max: 100
    },
});


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/data', function(req, res){
  var q = knex.select().from('chat').orderBy('seq', 'desc').limit(50);
  q.then(function(rows) {
      console.log('ROWS', rows.length)
      res.json(rows);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});


/* connection 이벤트 발생시 처리 내용을 정의 */
io.on('connection', function(socket) {
  // socket이라는 변수는 node.js의 socket.io 패키지에서 우리에게 넘겨주는 변수임
  // socket.io 서버에 접속한 클라이언트의 socket을 의미함.
  console.log('a user connected');
  socket.broadcast.emit('hi'); // 'hi'라는 이벤트를 생성함

  // 'disconnect'라는 이벤트 처리 내용을 정의
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  // 'chat message'라는 이벤트 처리 내용을 정의
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
    var q = knex().insert({mesg: msg}).into('chat');
    q.then(function(ids) {
      console.log('INSERT OK')
    })
    .catch(function(err) {
      console.log('INSERT FAIL', err)
    });
  }); // socket.on()



});

io.emit('some event', { for: 'everyone' });

var port = 3000;
http.listen(port, function(){
  console.log('listening on *:', port);
});

