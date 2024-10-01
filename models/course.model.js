import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  trainer: {
    trainer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    trainer_name: {
      type: String,
      required: true,
    }
  }
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
