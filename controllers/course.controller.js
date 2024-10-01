import Course from "../models/course.model.js";

// Add a new course
export const addCourse = async (req, res) => {
  const { title, description, trainer_id, employee_ids } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      trainer: { trainer_id },
      employees: employee_ids, // Assuming employees field is an array in your schema
    });

    await newCourse.save();
    res
      .status(201)
      .json({ message: "Course added successfully", course: newCourse });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("trainer_id")
      .populate("employee_ids");
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
      .populate("trainer_id")
      .populate("employee_ids");
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
