var fs = require("fs");
var mysql = require("mysql");
const dbConfig = require("./db.config.js");

const serverCa = [fs.readFileSync("./DigiCertGlobalRootCA.crt.pem", "utf-8")];

var connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  port: dbConfig.PORT,
  ssl: {
    rejectUnauthorized: true,
    ca: serverCa
  }
});

connection.getConnection((err,connection)=>{
    if(err)
        throw err;
    console.log("Database connected successfully");
    connection.release();
})

module.exports = connection;