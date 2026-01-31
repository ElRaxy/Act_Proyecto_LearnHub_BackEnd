const Course = require("../models/courses.model");
const baseUrlCourses = `/courses/views`;

// GET ALL COURSES (vista)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();

    res.locals.tituloEJS = "Cursos disponibles";
    res.render("courses/index", {
      courses,
      baseApi: baseUrlCourses,
    });
  } catch (error) {
    next(new AppError("Error obteniendo cursos: " + error, 500));
  }
};

// GET BY ID (vista)
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.locals.tituloEJS = course.title;
    res.render("courses/show", {
      course,
      baseApi: baseUrlCourses,
    });
  } catch (error) {
    next(new AppError("Error obteniendo curso: " + error, 500));
  }
};

// FORM NEW (vista)
exports.showCreateForm = (req, res) => {
  res.locals.tituloEJS = "Nuevo curso";
  res.render("courses/new", {
    baseApi: baseUrlCourses,
  });
};

// CREATE (acción)
exports.createCourse = async (req, res) => {
  try {
    await Course.create(req.body);
    res.redirect(baseUrlCourses);
  } catch (error) {
    res.status(500).send("Error creando curso: " + error);
  }
};

// FORM EDIT (vista)
exports.showEditForm = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    res.locals.tituloEJS = "Editar curso";
    res.render("courses/edit", {
      course,
      baseApi: baseUrlCourses,
    });
  } catch (error) {
    res.status(500).send("Error obteniendo datos: " + error);
  }
};

// UPDATE (acción)
exports.updateCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`${baseUrlCourses}`);
  } catch (error) {
    res.status(500).send("Error actualizando curso: " + error);
  }
};

// DELETE (acción)
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.redirect(baseUrlCourses);
  } catch (error) {
    res.status(500).send("Error eliminando curso: " + error);
  }
};
