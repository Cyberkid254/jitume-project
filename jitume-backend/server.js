import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import Student from "./models/Student.js";

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

app.get("/api/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post("/api/students", async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.put("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  const updatedStudent = await Student.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updatedStudent);
});

app.delete("/api/students/:id", async (req, res) => {
  const { id } = req.params;
  await Student.findByIdAndDelete(id);
  res.json({ success: true });
});

app.listen(4000, () => console.log("Server running on port 4000"));
