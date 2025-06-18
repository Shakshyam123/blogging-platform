require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("./config/passport");
const bcrypt = require("bcrypt");
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const app = express();
const PORT = 5000;
const JWT_SECRET = "this is a serious password";
const session = require("express-session");
const saltRounds = 10;
const authRoute = require("./auth");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  session({
    secret: "shakshyam",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoute);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express",
});

db.connect((err) => {
  if (err) return console.error("DB connection error:", err);
  console.log("Connected to MySQL");
});

async function verifyAccessToken(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return { success: true, data: decoded };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);

  const result = await verifyAccessToken(token);
  if (!result.success) return res.status(403).json({ error: result.error });

  req.user = result.data;
  next();
}

app.post("/nepal", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    birthdate,
    gender,
    country,
    profile_image,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !email ||
    !password ||
    !birthdate ||
    !gender ||
    !country ||
    !profile_image
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    const sql =
      "INSERT INTO register (first_name, last_name, email, password, birthdate, gender, country, profile_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      first_name,
      last_name,
      email,
      hash,
      birthdate,
      gender,
      country,
      profile_image,
    ];

    db.query(sql, values, (err, result) => {
      if (err)
        return res.status(500).json({ error: "DB Insert Error", detail: err });
      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).send("Email and password are required");

  const sql = "SELECT * FROM register WHERE email=?";
  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ msg: "Invalid email or password" });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ msg: "Invalid email or password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, is_admin: user.is_admin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ msg: "Logged in", token, user });
  });
});

app.get("/getProfile", authenticationToken, (req, res) => {
  const sql =
    "SELECT first_name, last_name, birthdate, gender, email, country, profile_image FROM register WHERE email=?";
  db.query(sql, [req.user.email], (err, results) => {
    if (err || results.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.status(200).json(results[0]);
  });
});

app.get("/authorDetail", authenticationToken, (req, res) => {
  const sql =
    "SELECT first_name, last_name, email, birthdate, gender, country, profile_image FROM register WHERE email=?";
  db.query(sql, [req.user.email], (err, results) => {
    if (err || results.length === 0)
      return res.status(404).send("Author not found");
    res.status(200).json(results[0]);
  });
});

// Blog
app.post("/blogPost", (req, res) => {
  const { author_name, image_link, title, heading, content } = req.body;
  if (!author_name || !image_link || !title || !heading || !content) {
    return res.status(400).send("All fields are required");
  }

  const sql =
    "INSERT INTO blog_posts (author_name, image_link, title, heading, content) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [author_name, image_link, title, heading, content], (err) => {
    if (err) return res.status(500).send("Error inserting blog post");
    res.status(200).send("Blog post inserted successfully");
  });
});

app.get("/getBlog", authenticationToken, (req, res) => {
  const sql = `
    SELECT 
      bp.id, bp.title, bp.content, bp.author_name, bp.created_at,
      bp.image_link, bp.heading, JSON_ARRAYAGG(bl.user_id) AS likes
    FROM blog_posts AS bp
    LEFT JOIN blog_like AS bl ON bp.id = bl.blog_id
    GROUP BY bp.id`;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching blog posts");
    res.status(200).json(results);
  });
});

app.get("/getPost/:id", (req, res) => {
  const sql = "SELECT * FROM blog_posts WHERE id=?";
  db.query(sql, [req.params.id], (err, results) => {
    if (err) return res.status(500).send("Error fetching blog post");
    res.status(200).json(results[0]);
  });
});

app.delete("/deletePost/:id", (req, res) => {
  const sql = "DELETE FROM blog_posts WHERE id=?";
  db.query(sql, [req.params.id], (err) => {
    if (err) return res.status(500).send("Error deleting blog post");
    res.status(200).send("Blog post deleted successfully");
  });
});

app.put("/blogLike/:id", authenticationToken, (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const checkSql = "SELECT * FROM blog_like WHERE User_id = ? AND Blog_id = ?";
  db.query(checkSql, [userId, postId], (err, result) => {
    if (err) return res.status(500).send("DB error");

    if (result.length > 0) {
      return res.status(200).json({ message: "Already liked" });
    } else {
      const insertSql =
        "INSERT INTO blog_like (User_id, Blog_id) VALUES (?, ?)";
      db.query(insertSql, [userId, postId], (err, insertResult) => {
        if (err) return res.status(500).send("Error liking post");
        res.status(201).json({ message: "Like added", insertResult });
      });
    }
  });
});

app.put("/dislike", authenticationToken, (req, res) => {
  const userId = req.user.id;
  const postId = req.body.id;

  const deleteSql = "DELETE FROM blog_like WHERE User_id = ? AND Blog_id = ?";
  db.query(deleteSql, [userId, postId], (err) => {
    if (err) return res.status(500).send("Error removing like");
    res.status(200).json({ message: "Like removed" });
  });
});

app.post("/contact", (req, res) => {
  const { Name, Email, PhoneNumber, Message } = req.body;
  if (!Name || !Email || !PhoneNumber || !Message)
    return res.status(400).send("All fields required");

  const sql =
    "INSERT INTO contacts (Name, Email, PhoneNumber, Message) VALUES (?, ?, ?, ?)";
  db.query(sql, [Name, Email, PhoneNumber, Message], (err) => {
    if (err) return res.status(500).send("Error saving contact");
    res.status(200).send("Contact saved successfully");
  });
});

app.get("/reccomendation", authenticationToken, (req, res) => {
  const sql = "SELECT * FROM blog_posts";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error fetching recommendations");
    res.status(200).json(results);
  });
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
