const mysql = require("mysql");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express",
  connectionLimit: 10,
});

pool.query("SELECT * FROM register", (error, results, fields) => {
  if (error) {
    return console.error(error);
  }
  console.log(results);
});
