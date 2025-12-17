const enrollmentService = require('../../services/enrollement.service')
const userService = require('../../services/user.service')
const courseService = require('../../services/course.service')
const baseUrlEnrollments = `/api/${process.env.API_VERSION}/enrollments`

// Listar todas las matrículas
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments()
    res.locals.tituloEJS = 'Matriculas'
    res.render('enrollments/index', { enrollments, baseApi: baseUrlEnrollments })
  } catch (error) {
    console.error(error)
    res.status(500).send('No se pudieron listar las matriculas')
  }
}

// Formulario nueva matrícula
exports.showNewEnrollment = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    const courses = await courseService.getAllCourses()
    res.locals.tituloEJS = 'Nueva Matricula'
    res.render('enrollments/new', { baseApi: baseUrlEnrollments, users, courses })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar la vista de nueva matrícula')
  }
}

// Crear matrícula
exports.createEnrollment = async (req, res) => {
  try {
    await enrollmentService.createEnrollment(req.body)
    res.redirect(baseUrlEnrollments)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
}

// Formulario editar matrícula
exports.showEditEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) return res.status(404).send('No se encontró la matricula')
    const users = await userService.getAllUsers()
    const courses = await courseService.getAllCourses()
    res.locals.tituloEJS = 'Editar Matricula'
    res.render('enrollments/edit', { enrollment, baseApi: baseUrlEnrollments, users, courses })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al cargar la vista de edición')
  }
}

// Actualizar matrícula
exports.updateEnrollment = async (req, res) => {
  try {
    await enrollmentService.updateEnrollment(req.params.id, req.body)
    res.redirect(`${baseUrlEnrollments}/${req.params.id}`)
  } catch (error) {
    console.error(error)
    res.status(400).send(error.message)
  }
}

// Eliminar matrícula
exports.deleteEnrollment = async (req, res) => {
  try {
    await enrollmentService.deleteEnrollment(req.params.id)
    res.redirect(baseUrlEnrollments)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al eliminar la matricula')
  }
}

// Detalle matrícula
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) return res.status(404).send('No se encontró la matricula')
    res.locals.tituloEJS = 'Detalle de la Matricula'
    res.render('enrollments/show', { enrollment, baseApi: baseUrlEnrollments })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error al obtener la matricula')
  }
}
