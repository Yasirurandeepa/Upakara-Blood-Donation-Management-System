const mysql = require('mysql');

var connection = mysql.createConnection({         //one connection object used (singleton design pattern)
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "blood"
});

connection.connect((err) => {
  if(err){
    return console.log(err.message);
  }
  console.log("Connected to mysql server");
});

module.exports = {connection};
