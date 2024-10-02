import Course from '../models/course.model.js'; // Import the Course model
import Employee from '../models/employee.model.js'; // Import the Employee model

// Add a new course
export const addCourse = async (req, res) => {
  const { title, description, trainer_id, trainer_name, employees } = req.body;

  try {
    // Verify if all employee IDs exist in the Employee collection
    const validEmployees = await Employee.find({ _id: { $in: employees } });
    if (validEmployees.length !== employees.length) {
      return res.status(400).json({ message: "Invalid or non-existent employee IDs" });
    }

    // Create the new course
    const newCourse = new Course({
      title,
      description,
      trainer: {
        trainer_id, // Ensure this is correctly passed
        trainer_name, // Ensure this is correctly passed
      },
      employees, // Array of valid employee ObjectIds
    });

    await newCourse.save();
    res.status(201).json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    console.error("Error creating course:", error); // Log the actual error to help with debugging
    res.status(500).json({ message: "Failed to create course", error: error.message });
  }
};


// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("trainer.trainer_id") // Populate trainer
      .populate("employees"); // Populate employee IDs
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a specific course by ID
export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id)
      .populate("trainer.trainer_id") 
      .populate("employees");
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const course = await Course.findByIdAndUpdate(id, updates, { new: true });
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
