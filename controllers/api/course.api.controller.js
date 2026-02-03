const Course = require("../../models/courses.model");
const courseService = require("../../services/course.service");
const baseUrlCourses = `/api/${process.env.API_VERSION}/courses`;

// GET ALL COURSES (vista)
// GET ALL COURSES (vista)
exports.getAllCourses = async (req, res, next) => {
  try {
    // const courses = await Course.find()
    const courses = await courseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

// GET BY ID (vista)
exports.getCourseById = async (req, res, next) => {
  try {
    // const course = await Course.findById(req.params.id)
    const course = await courseService.getCourseById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
};

// CREATE (acción)
exports.createCourse = async (req, res, next) => {
  try {
    await courseService.createCourse(req.body);
    res.status(201).json(req.body);
  } catch (error) {
    next(error);
  }
};

// UPDATE (acción)
exports.updateCourse = async (req, res, next) => {
  try {
    const updatedCourse = await courseService.updateCourse(
      req.params.id,
      req.body,
    );
    // res.redirect(`${baseUrlCourses}/${req.params.id}`)
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

// DELETE (acción)
exports.deleteCourse = async (req, res, next) => {
  try {
    const courseDeleted = await courseService.deleteCourse(req.params.id);
    res.status(200).json(courseDeleted);
    // res.redirect(baseUrlCourses)
  } catch (error) {
    next(error);
  }
};
