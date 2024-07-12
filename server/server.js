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
  const query = `SELECT * FROM register WHERE  email='${email}' AND password='${password}'`;

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
  const { author_name, image_link, title, heading, content } = req.body;

  if (!author_name || !image_link || !title || !heading || !content) {
    return res.status(400).send("All fields are required");
  }

  const sql =
    "INSERT INTO blog_posts (author_name, image_link, title, heading, content) VALUES (?, ?, ?, ?, ?)";

  db.query(
    sql,
    [author_name, image_link, title, heading, content],
    (error, results) => {
      if (error) {
        console.error("Error inserting blog post:", error);
        return res.status(500).send("Error inserting blog post");
      } else res.status(200).send("Blog post inserted successfully");
    }
  );
});

app.get("/getBlog", (req, res) => {
  const sql = "SELECT * FROM blog_posts";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data from blog_posts:", err);
      res.status(500).send("Error fetching blog posts");
    } else {
      console.log("Blog posts fetched successfully:", results);
      res.status(200).json(results);
    }
  });
});
app.post("/contact", (req, res) => {
  const { Name, Email, PhoneNumber, Message } = req.body;
  console.log(req.body);

  if (!Name || !Email || !PhoneNumber || !Message)
    return res.status(400).send("all fields are required");
  const sql =
    "INSERT into contacts (Name,Email,PhoneNumber,Message) VALUES(?,?,?,?)";
  db.query(sql, [Name, Email, PhoneNumber, Message], (error, result) => {
    if (error) {
      console.error("Error inserting contact", error);
      return res.status(400).send("Error inserting into contact");
    } else return res.status(200).send("contact inserted successfully");
  });
});

app.get(`/getPost/:id`, (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM blog_posts WHERE id=?`;
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error fetching data from blog_posts:", err);
      res.status(500).send("Error fetching blog posts");
    } else {
      console.log("Blog posts fetched successfully:", results);
      res.status(200).json(results);
    }
  });
});
app.delete("/deletePost/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM blog_posts WHERE id=?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error in deleting Data", err);
      res.status(500).send("Error in Deleting Data");
    } else {
      console.log("Data Deleted Successfully", result);
      res.status(200).send(result);
    }
  });
});
const successMessage = {
  message: "login success",
  token: "hello",
};
app.post("/name", (req, res) => {
  const login = req.body;
  if (login.name && login.password) {
    res.status(200).send("successfully loginned");
  } else {
    res.status(422).send("something is missing  ");
  }
});
module.exports = app;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
