import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL Pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Routes
// Get deleted students
app.get("/api/students/deleted", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM students WHERE deleted = 1",
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Restore deleted student
app.put("/api/students/:id/restore", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE students SET deleted = 0 WHERE id = ?",
      [req.params.id],
    );
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student restored successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    // Only fetch students that are not deleted
    const [rows] = await connection.query(
      "SELECT * FROM students WHERE deleted = 0",
    );
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get student by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      "SELECT * FROM students WHERE id = ?",
      [req.params.id],
    );
    connection.release();
    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Add new student
app.post("/api/students", async (req, res) => {
  try {
    const { name, course, year } = req.body;
    if (!name || !course || !year) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO students (name, course, year) VALUES (?, ?, ?)",
      [name, course, year],
    );
    connection.release();
    res.status(201).json({
      id: result.insertId,
      name,
      course,
      year,
      message: "Student added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update student
app.put("/api/students/:id", async (req, res) => {
  try {
    const { name, course, year } = req.body;
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "UPDATE students SET name = ?, course = ?, year = ? WHERE id = ?",
      [name, course, year, req.params.id],
    );
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const connection = await pool.getConnection();
    // Soft delete: set deleted = 1
    const [result] = await connection.query(
      "UPDATE students SET deleted = 1 WHERE id = ?",
      [req.params.id],
    );
    connection.release();
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.json({ message: "Student deleted (soft) successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get courses
app.get("/api/courses", async (req, res) => {
  const courses = [
    { id: 1, name: "BSIS" },
    { id: 2, name: "BSIT" },
    { id: 3, name: "BSCS" },
  ];
  res.json(courses);
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "API is running" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
