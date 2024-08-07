// const mysql = require("mysql");

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "express",
//     JWT_SECRET: process.env.JWT_SECRET,
//   });
  
// function findUserByEmail(email) {
//   const query = 'SELECT * FROM register WHERE email = ?';
//   db.query(query, [email], (error, results) => {
//     if (error) throw error;
//     (results);
//   });
// }

// module.exports = {
//   findUserByEmail
// };