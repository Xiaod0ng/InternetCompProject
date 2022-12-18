const mysql = require("mysql");
const dbConfig = require("./db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

connection.getConnection((err,connection)=>{
    if(err)
        throw err;
    console.log("Database connected successfully");
    connection.release();
})

module.exports = connection;