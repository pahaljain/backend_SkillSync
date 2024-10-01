import express from "express";
import { enrollEmployee, getAllEnrollments, getEnrollmentById, updateEnrollment, deleteEnrollment } from "../controllers/enrollment.controller.js";

const router = express.Router();

// Route to enroll an employee in a course
router.post("/enrollments", enrollEmployee);

// Route to get all enrollments
router.get("/enrollments", getAllEnrollments);

// Route to get a specific enrollment by ID
router.get("/enrollments/:id", getEnrollmentById);

// Route to update feedback for an enrollment
router.put("/enrollments/:id", updateEnrollment);

// Route to delete an enrollment by ID
router.delete("/enrollments/:id", deleteEnrollment);

export default router;
