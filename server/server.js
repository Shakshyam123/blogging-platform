const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRETE = "this is a serious password";

const salt = 10;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express",
  JWT_SECRET: process.env.JWT_SECRET,
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
  console.log("Received data:", req.body);

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

  const sql =
    "INSERT INTO register (first_name, last_name, email, password, birthdate, gender, country,profile_image) VALUES (?, ?, ?,?, ?, ?, ?, ?)";
  bcrypt.hash(password, salt, (err, hash) => {
    if (err) {
      console.log(err);
    }

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
      if (err) {
        console.error("Error inserting data into the database:", err);
        return res.status(500).json({ error: "Internal server error" });
      } else
        res
          .status(201)
          .json({ result: "User registered successfully", result });
    });
  });
});
app.get("/register", (req, res) => {
  const email = "boharashakshyam@gmail.com";
  const sql =
    "SELECT first_name, last_name, email, password, birthdate, gender, country, profile_image FROM register WHERE email=?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error("Error fetching data from database:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    console.log("this is a result", results[0]);
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

app.get("/getPost/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM blog_posts WHERE id=?";
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }

  const sql = "SELECT * FROM register WHERE email=?";
  const values = [email];
  db.query(sql, values, async (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      return res.status(500).send("Error selecting user");
    }

    if (results.length === 0) {
      return res.status(401).send({ msg: "Email or password is incorrect" });
    }

    try {
      const match = await bcrypt.compare(password, results[0].password);

      if (!match) {
        return res.status(401).send({ msg: "Email or password is incorrect" });
      }

      const token = jwt.sign(
        {
          id: results[0].id,
          email: results[0].email,
          is_admin: results[0].is_admin,
        },
        JWT_SECRETE,
        { expiresIn: "1h" }
      );
      return res.status(200).send({
        msg: "Logged in",
        token,
        user: results[0],
      });
    } catch (bError) {
      return res.status(400).send({ msg: "An error occurred", error: bError });
    }
  });
});

async function verifyAccessToken(token) {
  try {
    const decoded = await jwt.verify(token, JWT_SECRETE);
    console.log("this is decodedcode ", decoded);
    return { success: true, data: decoded };
  } catch (err) {
    return { success: false, error: err };
  }
}

async function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  console.log("thisis atherader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];
  console.log("this auth token a token", token);

  if (!token) {
    return res.sendStatus(401);
  }

  const result = await verifyAccessToken(token);
  if (!result.success) {
    return res.status(403).json({ error: result.error });
  }

  req.user = result.data;
  next();
}

app.get("/getProfile", authenticationToken, (req, res) => {
  const userEmail = req.user.email;

  const SQL =
    "SELECT first_name, last_name, birthdate, gender, email, country,profile_image FROM register WHERE email=?";
  db.query(SQL, [userEmail], (err, results) => {
    if (err) {
      return res.status(500).json({ msg: "Error fetching profile data", err });
    }
    if (results.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    console.log("this is a result", results);
    return res.status(200).json(results[0]);
  });
});

app.get("/getBlog", authenticationToken, (req, res) => {
  // const sql = `SELECT * FROM blog_posts `;
  // const sql = `SELECT * FROM blog_posts AS bp RIGHT JOIN blog_like AS bl ON bp.id = bl.blog_id`;

  const sql = ` SELECT 
    bp.id,
    bp.title,
    bp.content,
    bp.author_name,
    bp.created_at,
    bp.image_link,
    bp.heading,
    JSON_ARRAYAGG(bl.user_id) AS likes
FROM 
    blog_posts AS bp
LEFT JOIN 
    blog_like AS bl ON bp.id = bl.blog_id
GROUP BY 
    bp.id`;
  console.log("this is sql", sql);

  db.query(sql, (err, results) => {
    if (err) {
      console.log("err", err);
      return res.status(500).send("Error fetching blog posts");
    }
    console.log("blof result", results);
    return res.status(200).json(results);
  });
});
app.get("/authorDetail", authenticationToken, (req, res) => {
  const userEmail = req.user.email;
  const email = userEmail;
  const sql =
    "SELECT first_name, last_name, email birthdate, gender, country,profile_image FROM register where email=?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching blog posts");
    }
    return res.status(200).send(results[0]);
  });
});
app.put("/blogLike/:id", authenticationToken, (req, res) => {
  const userId = req.user.id;
  const postId = req.body.id;
  console.log("userId", userId);
  console.log("this is a post id", postId);

  const likeQuery = "SELECT * FROM blog_like WHERE User_id = ? AND Blog_id = ?";
  db.query(likeQuery, [userId, postId], (error, result) => {
    console.log("result", result);
    if (error) {
      return res.status(500).send("Error in selecting like: " + error.message);
    }
    if (result.length > 0) {
      return res.status(200).json({ message: "Post already liked" });
    } else {
      const insertQuery =
        "INSERT INTO blog_like (User_id, Blog_id) VALUES (?, ?)";
      db.query(insertQuery, [userId, postId], (error, insertResult) => {
        if (error) {
          return res
            .status(500)
            .send("Error in posting like: " + error.message);
        } else {
          return res.status(201).json({
            result: insertResult,
            message: "Like successfully added",
          });
        }
      });
    }
  });
});
app.put("/dislike", authenticationToken, (req, res) => {
  const userId = req.user.id;
  const postId = req.body.id;
  const query = "delete from blog_like where id=?";
  db.query(query, [userId, postId], (result, error) => {
    if (error) {
      res
        .status(500)
        .send({ error: error.message, message: "error in deleting like" });
    } else {
      res.status(201).json("successfully deleted");
    }
  });
});
// app.put("/blogLike/:id", authenticationToken, (req, res) => {
//   const userId = req.user.id;
//   const postId = req.body.id;
//   const like = "select * from blog_like where User_id=? and BLog_id=?";
//   db.query(like, [userId, postId], (error, result) => {
//     if (result.length === 0) {
//       return res.status(500).send(error);
//     }
//     if (result.length > 0) {
//       return res.status(200).json(result);
//     }
//     const sql = "delete from blog_like where User_id=? Blog_id=?";
//     db.query(sql, [userId, postId], (error, result) => {
//       if (error) {
//         return res.status(500).send("erorr in posting like", error);
//       } else {
//         res
//           .status(201)
//           .json({ result: result, message: "deleted successfully" });
//       }
//     });
//   });
// });

// db.query.findByIdAndUpdate(req.body.id,{
//   $push:{likes:req.user.id}},
//   {
//     new:true
//   }).exec((err,result)=>{
//     if(err){
//       res.status(422).send({error:err})
//     }else{
//       res.json(result)
//     }
//   })

app.get("/reccomendation", authenticationToken, (req, res) => {
  const sql = "SELECT * FROM blog_posts";
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching blog posts");
    }
    return res.status(200).json(results);
  });
});

module.exports = app;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
