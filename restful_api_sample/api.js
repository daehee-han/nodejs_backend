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

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
  secret: 'SLOW', resave: false ,
  saveUninitialized: true/*,cookie: { secure: true }*/}));

app.use(cookieParser('secret'));
app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


/* 센서 이름 목록 */
app.get('/sensor', function(req, res) {
  res.json(['sensor1', 'sensor2', 'sensor3','sensor4', 'sensor5']);
});

/* 특정 센서의 모든 데이타 */
app.get('/sensor/:sensorname', function(req, res) {
  var sensorname = req.params.sensorname;
  var seqno = req.params.seqno;
  console.log('PARAMS', req.params);

  var q = knex.select().from(sensorname);
  console.log('SQL', q.toString());
  q.then(function(rows) {
      console.log('ROWS', rows.length)
      res.json(rows);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});

/* 특정 센서의 특정 seq번호의 데이타 */
app.get('/sensor/:sensorname/seq/:seqno', function(req, res) {
  var sensorname = req.params.sensorname;
  var seqno = req.params.seqno;
  console.log('PARAMS', req.params);

  var q = knex.select().from(sensorname).where({seq: seqno});
  console.log('SQL', q.toString());
  q.then(function(rows) {
      console.log('ROWS', rows.length)
      res.json(rows);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});

/* 특정 센서의 특정 seq번호의 데이타 */
app.delete('/sensor/:sensorname/seq/:seqno', function(req, res) {
  var sensorname = req.params.sensorname;
  var seqno = req.params.seqno;
  console.log('PARAMS', req.params);

  var q = knex.del().from(sensorname).where({seq: seqno});
  q.then(function(dbres) {
      console.log('DELETE OK', dbres);
      res.json(dbres);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});


/* 센서 이름 목록 */
app.post('/sensor', function(req, res) {
  console.log('RAW BODY', req.rawBody);
  console.log('POST BODY', req.body);

  var sensorname = req.body.sensorname;
  var value = req.body.value;

  var q = knex.insert({value: value}).into(sensorname);
  console.log('SQL', q.toString());

  q.then(function(ids) {
      console.log('RESULT', ids);
      res.json(ids);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});

/*
URL 스타일 - query 스타일
예) /sensordata?sensorname=sensor2&seqno=100
특정 센서의 특정 seq번호의 데이타
*/
app.get('/sensordata', function(req, res) {
  console.log('QUERY', req.query);
  var sensorname = req.query.sensorname;
  var seqno = req.query.seqno;

  var q = knex.select().from(sensorname).where({seq: seqno});
  q.then(function(rows) {
      console.log('ROWS', rows.length)
      res.json(rows);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});



/*
URL 스타일 - query 스타일
예외 처리 방법 !
*/
app.get('/sensordata2', function(req, res) {
  console.log('QUERY', req.query);
  var sensorname = req.query.sensorname;
  var seqno = req.query.seqno;

  if (! sensorname) {
    res.status(404);
    return;
  }

  var q = knex.select().from(sensorname);

  if (seqno) {
    q.where({seq: seqno});
  }
  console.log('SQL', q.toString());

  q.then(function(rows) {
      console.log('ROWS', rows.length)
      res.json(rows);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
});

/*
URL 스타일 - query 스타일
예) /sensordata?sensorname=sensor2&seqno=100
특정 센서의 특정 seq번호의 데이타
*/
app.get('/sensordata', function(req, res) {
  console.log('QUERY', req.query);
  var sensorname = req.query.sensorname;
  var seqno = req.query.seqno;

  var q = knex.select().from(sensorname).where({seq: seqno});
  q.then(function(rows) {
      console.log('ROWS', rows.length)
      res.json(rows);
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      res.json();
    });
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

