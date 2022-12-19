var fs = require("fs");
var mysql = require("mysql");
const dbConfig = require("./db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
});

connection.getConnection((err,connection)=>{
    if(err)
        throw err;
    console.log("Database connected successfully");
    connection.release();
})

module.exports = connection;