const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to database.");
});

app.post("/nepal", (req, res) => {
  console.log(req.body);
  const { first_name, last_name, email, password, birthdate, gender, country } =
    req.body;
  console.log("Received data:", req.body);

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !birthdate ||
    !gender ||
    !country
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO register (first_name, last_name, email, password, birthdate, gender, country) VALUES (?, ?, ?, ?, ?, ?, ?)";
  const values = [
    first_name,
    last_name,
    email,
    password,
    birthdate,
    gender,
    country,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error inserting data into the database:", err);
      return res.status(500).json({ error: "Internal server error" });
    } else
      res.status(201).json({ result: "User registered successfully", result });
  });
});
app.get("/hello", (req, res) => {
  const email = "boharashakshyam@gmail.com";
  const sql =
    "SELECT first_name, last_name, email, password, birthdate, gender, country FROM register WHERE email=?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    console.log(results[0]);
    res.json(results[0]);
  });
});
app.post("/name", (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  if (!email || !password) {
    res.status(400).send("email and password are required");
    return;
  }
  const query = `SElECT * FROM register WHERE  email='${email}' AND password='${password}'`;

  const values = [email, password];

  db.query(query, values[(email, password)], (err, results) => {
    if (err) {
      console.error(`Error executing query:`, err);
      res.status(500).send("An error occured");
    } else if (results.length === 0) {
      res.status(404).send("user not found or inavlid credentials");
      return;
    }
    res.json(results[0]);
  });
});
app.post("/blogPost", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("connected");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
