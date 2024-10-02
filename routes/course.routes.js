import express from "express";
import {
  addCourse,
  getAllCourses,
  getCourseById,
} from "../controllers/course.controller.js";

const router = express.Router();

// Route to add a new course
router.post("/", addCourse);

// Route to get all courses
router.get("/", getAllCourses);

// Route to get a specific course by ID
router.get("/:id", getCourseById);

// Route to update a course by ID
// router.put("/:id", updateCourse);

// Route to delete a course by ID
// router.delete("/:id", deleteCourse);

export default router;
