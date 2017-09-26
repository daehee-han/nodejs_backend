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

var q1 = knex.select().from('sensor1'); // 전체 레코드
var q1 = knex.first().from('sensor1'); // 첫 레코드 하나
var q1 = knex.select().from('sensor1').limit(10); // 10개 레코드로 제한
var q1 = knex.select().from('sensor1').orderBy('seq', 'desc').limit(10); // 뒤에서부터 10개 레코드로 제한

/* toString() 를 이용하여 query내용을 볼 수 있다 */
console.log(q1.toString());

/* 정상 케이스 생성 - query 수행 */
q1.then(function(rows) {
    console.log('ROWS', rows.length);
    for(var i=0; i<rows.length; i++) {
      console.log(rows[i]);
    }
  })
  .catch(function(err) {
    console.log(err);
  });

// sensor1 테이블의 필드는 'seq', 'value'.
// 'seq'필드는 auto_increment로 설정되어 있어서 우리가 지정할 필요가 없음.
var q2 = knex.insert({value: 10.0}).into('sensor1');
/* INSERT */
q2.then(function(id) {
    console.log('RESULT of INSERT', id);
  })
  .catch(function(err) {
    console.log(err);
  });
  
var q3 = knex.select().from('q3');
/* 오류 케이스 생성 - 테이블 이름이 틀린 경우임 */
q3.then(function(rows) {
    console.log('ROWS', rows.length);
  })
  .catch(function(err) {
    console.log('FAILED !!', err);
  });
