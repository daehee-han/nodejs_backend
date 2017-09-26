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

/*
https://caolan.github.io/async/docs.html#waterfall
*/
var async = require('async');

function get_info(id) {
  async.waterfall([
    // user 테이블 읽기
    function(callback) {
      var q = knex.select().from('user').where({id: id});
      console.log('SQL', q.toString());
      q.then(function(rows) {        
        if (rows.length > 0) {
          console.log('ROW', rows[0]);
          callback(null, rows[0].name);
        } else {
          callback('ID NOT Found');  
        }
      })
      .catch(function(err) {
        console.log('DB ERROR', err);
        callback('DB ERROR ');
      });
    },
    // name 테이블 읽기
    function(name, callback) {
      var q = knex.select().from('name').where({name: name});
      console.log('SQL', q.toString());
      q.then(function(rows) {
        if (rows.length > 0) {
          console.log('ROW', rows[0]);
          callback(null, rows[0].sensor);
        } else {
          callback('NAME NOT Found');  
        }
      })
      .catch(function(err) {
        console.log('DB ERROR', err);
        callback('DB ERROR ');
      });        
    },

    // sensor1 테이블 읽기
    function(sensorname, callback) {
      var q = knex.select().from(sensorname).limit(10);
      console.log('SQL', q.toString());
      q.then(function(rows) {
        console.log('ROWS', rows.length);
        if (rows.length > 0) {
          callback(null, rows);
        } else {
          callback('SENSOR NOT Found');  
        }
      })
      .catch(function(err) {
        console.log('DB ERROR', err);
        callback('DB ERROR ');
      });
    }
  ],
  //
  function(err, result) {
      // result는 최종 결과.
      // waterfall 에 담긴 job들 중에 마지막 job의 결과

      if (err) {
        console.log('FINALLY ERROR', err);
      } else {
        console.log('FINALLY OK', result);
      }
  });
}

get_info(1);