var async = require('async');

function mysquare(number, callback) {
    var result = number*number;
    var err = null;
    if (result > 30) err = 'this is error';
    callback(err, result);
}


var data = [1,2,3,4,5,6,7,8,9,10];

async.map(data, mysquare, function(err, result) { 
    console.log('ASYNC.MAP()', result);
  });

async.filter(data, function(item, callback) {
    callback( item % 2 == 0); // we must call the callback given from the inside of 'async'
  },
  function(results) { 
    console.log('ASYNC.FILTER()', results);
  });


async.series([
    function(callback){
      callback(null, 'res1');
    },
    function(callback){
      callback(null, 'res2');
    },
    function(callback){
      callback(null, 'res3');
    }
  ],
  function(err, results){
    console.log('ASYNC.SERIES() SUCC', err, results);
  });

async.series([
    function(callback){
      callback(null, 'res1');
    },
    function(callback){
      var err=true;
      if (err) 
        callback('error2 happened', null);
      else
        callback(null, 'res2');
    },
    function(callback){
      callback(null, 'res3');
    }
  ],
  function(err, results){
    console.log('ASYNC.SERIES() FAIL', err, results);
  });


async.waterfall([
    function(cb){
      cb(null, 'res1');
    },
    function(arg1, callback){
      callback(null, 'res2', 'res3');
    },
    function(arg1, arg2, callback){
      callback(null, 'finished');
    }
  ],
  function(err, results){
    console.log('ASYNC.WATERFALL() SUCC', err, results);
  });

async.waterfall([
    function(cb){
      
      cb(null, 'res1');
    },
    function(arg1, callback){
        
      callback('error in second', 'res2', 'res3');
    },
    function(arg1, arg2, callback){
      callback(null, 'finished');
    }
  ],
  function(err, result, result2){
    console.log('ASYNC.WATERFALL() FAIL', err, result, result2);
  });

