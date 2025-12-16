const Course = require('../models/courses.model')
const baseUrlCourses = `/api/${process.env.API_VERSION}/courses`

// GET ALL COURSES (vista)
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()

    res.render('courses/index', {
      title: 'Cursos disponibles',
      courses,
      baseApi: baseUrlCourses,
    })
  } catch (error) {
    res.status(500).send('Error obteniendo cursos: ' + error)
  }
}

// GET BY ID (vista)
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    res.render('courses/show', {
      title: course.name,
      course,
      baseApi: baseUrlCourses,
    })
  } catch (error) {
    res.status(500).send('Error obteniendo curso: ' + error)
  }
}

// FORM NEW (vista)
exports.showCreateForm = (req, res) => {
  res.render('courses/new', {
    title: 'Nuevo curso',
    baseApi: baseUrlCourses,
  })
}

// CREATE (acción)
exports.createCourse = async (req, res) => {
  try {
    await Course.create(req.body)
    res.redirect(baseUrlCourses)
  } catch (error) {
    res.status(500).send('Error creando curso: ' + error)
  }
}

// FORM EDIT (vista)
exports.showEditForm = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)

    res.render('courses/edit', {
      title: 'Editar curso',
      course,
      baseApi: baseUrlCourses,
    })
  } catch (error) {
    res.status(500).send('Error obteniendo datos: ' + error)
  }
}

// UPDATE (acción)
exports.updateCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(req.params.id, req.body)
    res.redirect(`${baseUrlCourses}/${req.params.id}`)
  } catch (error) {
    res.status(500).send('Error actualizando curso: ' + error)
  }
}

// DELETE (acción)
exports.deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id)
    res.redirect(baseUrlCourses)
  } catch (error) {
    res.status(500).send('Error eliminando curso: ' + error)
  }
}
