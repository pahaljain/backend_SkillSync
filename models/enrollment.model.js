import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({
  course_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  feedback: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Performance",
  }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
export default Enrollment;
