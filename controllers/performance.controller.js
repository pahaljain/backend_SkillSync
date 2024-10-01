import Enrollment from "../models/enrollment.model.js";

// Assign performance scores to an employee
export const assignScore = async (req, res) => {
  const { enrollment_id, feedback } = req.body;

  try {
    const enrollment = await Enrollment.findById(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    enrollment.feedback = feedback;
    await enrollment.save();
    
    res.status(200).json({ message: "Score assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get performance by course
export const getPerformanceByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({ course_id: courseId }).populate("employee_id");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get performance by employee
export const getPerformanceByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const enrollments = await Enrollment.find({ employee_id: employeeId }).populate("course_id");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
