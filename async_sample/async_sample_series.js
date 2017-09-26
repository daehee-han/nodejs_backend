/*
https://caolan.github.io/async/docs.html#series
*/
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


function get_sensor_data(sensorname, seqno, callback) {
  console.log(sensorname, seqno);
  var q = knex.select().from(sensorname).where({seq: seqno});
  console.log('SQL', q.toString());
  q.then(function(rows) {
      console.log('ROWS', rows.length);
      if (rows.length) {
        rows[0].sensor = sensorname;
        console.log(sensorname, rows[0].seq, rows[0].value);
        callback(null, rows[0]);
      }
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
      callback('DB ERROR ' + sensorname, []);
    });
}

/*
http://caolan.github.io/async/docs.html#series
*/
var async = require('async');
async.series([
    function(callback) {
        // do some stuff ...
        get_sensor_data('sensor1', '203', callback);
     },
    function(callback) {
        // do some more stuff ...
        get_sensor_data('sensor2', '203', callback);
     },
    function(callback) {
        // do some more stuff ...
        get_sensor_data('sensor30', '203', callback);
     }
],
// optional callback
function(err, results) {
    // results is now equal to ['one', 'two']
    if (err) {
      console.log('TOTAL ERROR', err, results);
    } else {
      console.log('RESULTS', results);
    }
});