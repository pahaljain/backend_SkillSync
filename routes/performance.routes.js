import express from "express";
import { assignScore, getPerformanceByCourse, getPerformanceByEmployee } from "../controllers/performance.controller.js";

const router = express.Router();

// Route to assign performance scores to an employee for a specific course
router.post("/assign-score", assignScore);

// Route to get performance for a specific course
router.get("/:courseId", getPerformanceByCourse);

// Route to get performance for a specific employee
router.get("/employee/:employeeId", getPerformanceByEmployee);

export default router;
