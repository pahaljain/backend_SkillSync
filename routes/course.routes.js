import express from "express";
import {
  addCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller.js";

const router = express.Router();

// Route to add a new course
router.post("/courses", addCourse);

// Route to get all courses
router.get("/courses", getAllCourses);

// Route to get a specific course by ID
router.get("/courses/:id", getCourseById);

// Route to update a course by ID
router.put("/courses/:id", updateCourse);

// Route to delete a course by ID
router.delete("/courses/:id", deleteCourse);

export default router;
