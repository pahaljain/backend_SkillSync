import Enrollment from "../models/enrollment.model.js";
import Performance from "../models/performance.model.js";

// Assign performance scores to an employee
export const assignScore = async (req, res) => {
  const { enrollment_id, feedback, overall_score } = req.body;

  try {
    const enrollment = await Enrollment.findById(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Validate feedback and overall score
    if (overall_score < 0 || overall_score > 10) {
      return res.status(400).json({ message: "Overall score must be between 0 and 10" });
    }

    const validFields = ['punctuality', 'hardworking', 'assignment_ontime', 'communication_skills'];
    for (let key of Object.keys(feedback)) {
      if (!validFields.includes(key) || feedback[key] < 1 || feedback[key] > 5) {
        return res.status(400).json({ message: `Invalid feedback field or value for ${key}` });
      }
    }

    const performance = new Performance({
      enrollment_id,
      feedback,
      overall_score
    });

    await performance.save();

    enrollment.feedback = performance._id; // Link performance to enrollment
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
    const enrollments = await Enrollment.find({ course_id: courseId })
      .populate("employee_id")
      .populate("feedback");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get performance by employee
export const getPerformanceByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    const enrollments = await Enrollment.find({ employee_id: employeeId })
      .populate("course_id")
      .populate("feedback");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
