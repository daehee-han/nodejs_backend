
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


function get_sensor_data(sensorname, seqno) {
  console.log(sensorname, seqno);
  var q = knex.select().from(sensorname).where({seq: seqno});
  console.log('SQL', q.toString());
  q.then(function(rows) {
      console.log('ROWS', rows.length);
      if (rows.length) {
        console.log(sensorname, rows[0].seq, rows[0].value);
      }
    })
    .catch(function(err) {
      console.log('DB ERROR', err);
    });
}

get_sensor_data('sensor1', '203');
get_sensor_data('sensor2', '203');
get_sensor_data('sensor3', '203');
get_sensor_data('sensor4', '203');