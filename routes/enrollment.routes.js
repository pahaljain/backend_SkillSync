import express from "express";
import { enrollEmployee, getAllEnrollments, getEnrollmentById } from "../controllers/enrollment.controller.js";

const router = express.Router();

// Route to enroll an employee in a course
router.post("/", enrollEmployee);

// Route to get all enrollments
router.get("/", getAllEnrollments);

// Route to get a specific enrollment by ID
router.get("/:id", getEnrollmentById);

// Route to update feedback for an enrollment
// router.put("/:id", updateEnrollment);

// Route to delete an enrollment by ID
// router.delete("/enrollments/:id", deleteEnrollment);

export default router;
