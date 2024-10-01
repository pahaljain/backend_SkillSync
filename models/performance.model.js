import mongoose from "mongoose";

// Schema for feedback categories
const feedbackSchema = new mongoose.Schema({
  punctuality: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true, 
    default: 3, 
  },
  hardworking: {
    type: Number,
    enum: [1, 2, 3, 4, 5], 
    required: true,
    default: 3,
  },
  assignment_ontime: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    default: 3,
  },
  communication_skills: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
    default: 3,
  }
});

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
    type: feedbackSchema,
    default: () => ({}) 
  }
});

const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;
