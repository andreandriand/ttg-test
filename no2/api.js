// Import dependencies
const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ttg_test",
});

db.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
  console.log("Connected");
});

// Create a new user
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validate request body
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  // Check if the email is unique
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length > 0) {
      return res.status(400).json({ error: "Email already exists." });
    }

    // Insert new user
    db.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email], (err, result) => {
      if (err) return res.status(500).json({ error: "Database error." });

      res.status(201).json({ message: "User created successfully.", userId: result.insertId });
    });
  });
});

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    res.status(200).json(results);
  });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json(results[0]);
  });
});

// Delete user by ID
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error." });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
