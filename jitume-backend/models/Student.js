import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  idNumber: String,
  phoneNumber: String,
  comment: String,
}, {
  timestamps: true
});

const Student = mongoose.model("Student", studentSchema);

export default Student;
