import express from "express";
import cors from "cors";
import sql, { connectDB } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
await connectDB();

// GET all users
app.get("/users", async (req, res) => {
  try {
    const result = await sql.query("SELECT * FROM Users");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    await sql.query`INSERT INTO Users (name, email) VALUES (${name}, ${email})`;
    res.json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
