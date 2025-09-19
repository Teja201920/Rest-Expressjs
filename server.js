// server.js
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample data (acting like a database)
let students = [
  { id: 1, name: "Tejaswarrao" },
  { id: 2, name: "Prasanna" },
  { id: 3, name: "Sai Teja" }
];

// GET → Read all students
app.get("/students", (req, res) => {
  res.status(200).json(students);
});

// POST → Add a new student
app.post("/students", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const newStudent = { id: students.length + 1, name };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// PUT → Update a student by ID
app.put("/students/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const student = students.find((s) => s.id === parseInt(id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  student.name = name || student.name;
  res.status(200).json(student);
});

// DELETE → Remove a student by ID
app.delete("/students/:id", (req, res) => {
  const { id } = req.params;
  const index = students.findIndex((s) => s.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);
  res.status(200).json(deletedStudent);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
