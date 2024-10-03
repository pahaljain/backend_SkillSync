import Enrollment from "../models/enrollment.model.js";
import Performance from "../models/performance.model.js";

// Assign performance scores to an employee
export const assignScore = async (req, res) => {
  const { enrollment_id, feedback, overall_score } = req.body;
  // console.log(req);
  
  try {
    const enrollment = await Enrollment.findById(enrollment_id);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Ensure overall score is between 0 and 10
    if (overall_score < 0 || overall_score > 10) {
      return res
        .status(400)
        .json({ message: "Overall score must be between 0 and 10" });
    }

    // Create new performance record
    const performance = new Performance({
      enrollment_id,
      feedback, // feedback will automatically be validated by the schema
      overall_score,
    });

    // Save performance and link to enrollment
    await performance.save();

    // Update the enrollment to reference this performance
    enrollment.feedback = performance._id;
    await enrollment.save();

    res.status(200).json({ message: "Score assigned successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getPerformanceByCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const enrollments = await Enrollment.find({ course_id: courseId })
      .populate("employee_id")
      .populate("feedback");

    const performanceData = await Promise.all(enrollments.map(async (enrollment) => {
      const feedback = enrollment.feedback ? await Performance.findById(enrollment.feedback) : null;
      return {
        employee_id: enrollment.employee_id,
        feedback: feedback ? feedback.feedback : null,
        overall_score: feedback ? feedback.overall_score : null,
      };
    }));

    res.status(200).json(performanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPerformanceByEmployee = async (req, res) => {
  const { employeeId } = req.params;

  try {
    // Find the enrollment associated with the employee
    const enrollment = await Enrollment.findOne({ employee_id: employeeId })
      .populate("course_id") // Populate course details
      .populate("feedback"); // Populate feedback

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Check if feedback is present
    const performanceData = enrollment.feedback
      ? {
          employee_id: enrollment.employee_id,
          feedback: enrollment.feedback.feedback, // Access the embedded feedback schema
          overall_score: enrollment.feedback.overall_score, // Access overall score directly
        }
      : {
          employee_id: enrollment.employee_id,
          feedback: null,
          overall_score: null,
        };

    res.status(200).json(performanceData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
