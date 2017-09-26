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
  var q = knex.select().from(sensorname).where({seq: seqno});
  console.log('SQL', q.toString());
  q.then(function(rows) {
      if (rows.length) {
        rows[0].sensor = sensorname;
        console.log(sensorname, rows[0].seq, rows[0].value);
        callback(null);
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
async.eachSeries(
    ['sensor1', 'sensor2', 'sensor3'],
    function(item, callback) {
        // do some stuff ...
        console.log('ITEM', item);
        get_sensor_data(item, '203', callback);
    },
    
    // optional callback
    function(err) {
        if (err) {
          console.log('FINALLY ERROR', err);
        } else {
          console.log('FINALLY GOOD');
        }
    });