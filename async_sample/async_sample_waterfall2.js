/*
https://caolan.github.io/async/docs.html#waterfall
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
  //console.log('SQL', q.toString());
  q.then(function(rows) {
      //console.log('ROWS', rows.length);
      if (rows.length) {
        rows[0].sensorname = sensorname;
        //console.log(sensorname, rows[0].seq, rows[0].value);
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
async.waterfall([
    function(callback) {
        get_sensor_data('sensor1', '203', callback);
    },
    function(sensor1_rows, callback) {
        console.log('sensor1_rows', sensor1_rows);
        get_sensor_data('sensor2', '203', callback);
    },
    function(sensor2_rows, callback) {
        console.log('sensor2_rows', sensor2_rows);
        get_sensor_data('sensor3', '203', callback);
    }
],
//
function(err, result) {
    // result는 최종 결과.
    // waterfall 에 담긴 job들 중에 마지막 job의 결과

    if (err) {
      console.log('TOTAL ERROR', err, result);
    } else {
      console.log('RESULTS', result);
    }
});