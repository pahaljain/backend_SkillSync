import Enrollment from "../models/enrollment.model.js";

// Enroll an employee in a course
export const enrollEmployee = async (req, res) => {
  const { course_id, employee_id } = req.body;

  try {
    const newEnrollment = new Enrollment({
      course_id,
      employee_id,
    });

    await newEnrollment.save();
    res.status(201).json({ message: "Employee enrolled successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all enrollments
export const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate("course_id").populate("employee_id");
    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific enrollment by ID
export const getEnrollmentById = async (req, res) => {
  const { id } = req.params;

  try {
    const enrollment = await Enrollment.findById(id).populate("course_id").populate("employee_id");
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }
    res.status(200).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an enrollment (feedback)
// export const updateEnrollment = async (req, res) => {
//   const { id } = req.params;
//   const updates = req.body;

//   try {
//     const enrollment = await Enrollment.findByIdAndUpdate(id, updates, { new: true });
//     if (!enrollment) {
//       return res.status(404).json({ message: "Enrollment not found" });
//     }
//     res.status(200).json(enrollment);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// Delete an enrollment
// export const deleteEnrollment = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const enrollment = await Enrollment.findByIdAndDelete(id);
//     if (!enrollment) {
//       return res.status(404).json({ message: "Enrollment not found" });
//     }
//     res.status(200).json({ message: "Enrollment deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
