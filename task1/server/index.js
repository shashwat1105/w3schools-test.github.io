import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();


const app = express();
const allowedOrigins = ['http://shivam.zewaa.com'];

app.use(cors({
  origin: allowedOrigins,
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization',
}));
app.use(bodyParser.json());

// MySQL Connection Setup
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",  // If hosting locally or on FTP hosting
  user: process.env.DB_USER || "ftpuser",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "login_system",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

// Login Route

app.get("/",(req,res)=>{
  return res.send("Helllo from server")
})

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log("EMail",email,password);
  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  
  db.query(sql, [email, password], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length > 0) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  });
});

// Register Route
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  const sql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  
  db.query(sql, [username, email, password], (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ success: true, message: "User registered successfully" });
  });
});

// Server listening
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
