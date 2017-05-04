var connection = require("./connection.js");

function getQuestionMarks(num){
  var output="";
  if(num>0)
    output+="?";
  for(var i=1; i<num; ++i)
    output+=",?";
  return output;
}

function objToSql(obj){
  var keys=Object.keys(obj);
  var output="";
  if(keys.length>0)
    output+=keys[0] + "=" + obj[keys[0]];
  for(var i=1; i<keys.length; ++i){
    if (Object.hasOwnProperty.call(obj, keys[i])) {
      output+=","+keys[i] + "=" + obj[keys[i]];
    }
  }
  return output;
}

var orm = {
  selectAll: function(tableName, cb){
    connection.query("SELECT * FROM ??", [tableName], function(err, results){
      if(err)
        throw err;
      cb(results);
    });
  },
  
  insertOne: function(tableName, cols, vals, cb){
    var sql = "INSERT INTO " + tableName;
    sql+=" (";
    sql+=cols.toString();
    sql+=") VALUES (";
    sql+=getQuestionMarks(vals.length);
    sql+=") ";
    
    console.log(sql);

    connection.query(sql, vals, function(err, results){
      if(err)
        throw err;
      cb(results);
    });
  },

  updateOne: function(tableName, colsVals, condition, cb){
    var sql="UPDATE "+ tableName;
    sql+=" SET "+objToSql(colsVals);
    sql+=" WHERE "+condition;

    console.log(sql);
    connection.query(sql, function(err, results){
      if(err)
        throw err;
      cb(results);
    });
  },

  destroyOne: function(tableName, condition, cb){
    var sql= "DELETE FROM "+tableName;
    sql+=" WHERE "+condition;

    console.log(sql);
    connection.query(sql, function(err, results){
      if(err)
        throw err;
      cb(results);
    });
  }
};


module.exports = orm;