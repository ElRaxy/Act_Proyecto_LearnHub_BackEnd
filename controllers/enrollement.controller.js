const userService = require('../services/user.service')
const courseService = require('../services/course.service')
const enrollmentService = require('../services/enrollement.service')
const baseUrlEnrollments = `/api/${process.env.API_VERSION}/enrollments`

// Listar todas las matrículas
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments()

    res.locals.tituloEJS = 'Matriculas'
    res.render('enrollments/index', {
      enrollments,
      baseApi: baseUrlEnrollments,
    })
  } catch (error) {
    console.error('Error real en getAllEnrollments:', error)
    res.status(500).send('No se pudieron listar las matriculas')
  }
}

// Obtener una matrícula por ID
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).send('No se encontró la matricula')
    }

    res.locals.tituloEJS = 'Detalle de la Matricula'
    res.render('enrollments/show', {
      enrollment,
      baseApi: baseUrlEnrollments,
    })
  } catch (error) {
    console.error('Error en getEnrollmentById:', error)
    res.status(500).send('Error al obtener la matricula')
  }
}

// Mostrar formulario de nueva matrícula
exports.showNewEnrollment = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    const courses = await courseService.getAllCourses()
    res.locals.tituloEJS = 'Nueva Matricula'
    res.render('enrollments/new', {
      baseApi: baseUrlEnrollments,
      users,
      courses,
    })
  } catch (error) {
    console.error('Error en showNewEnrollment:', error)
    res.status(500).send('Error al cargar la vista de nueva matrícula')
  }
}

// Crear nueva matrícula
exports.createEnrollment = async (req, res, next) => {
  try {
    // Verificamos si el usuario ya tiene matrícula
    const existingEnrollment = await enrollmentService.getEnrollmentByUserId(req.body.userId)
    if (existingEnrollment) {
      const error = new Error(`El usuario ya tiene una matrícula activa`)
      error.status = 400
      error.source = 'Crear matrícula'
      return next(error)
    }

    await enrollmentService.createEnrollment({
      userId: req.body.userId,
      courseId: req.body.courseId,
      enrollmentsDate: req.body.enrollmentsDate,
      status: req.body.status,
      notes: req.body.notes,
    })

    res.redirect(baseUrlEnrollments)
  } catch (error) {
    next(error)
  }
}

// Mostrar formulario de edición de matrícula
exports.showEditEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).send('No se encontró la matricula')
    }

    const users = await userService.getAllUsers()
    const courses = await courseService.getAllCourses()

    res.locals.tituloEJS = 'Editar Matricula'
    res.render('enrollments/edit', {
      enrollment,
      baseApi: baseUrlEnrollments,
      users,
      courses,
    })
  } catch (error) {
    console.error('Error en showEditEnrollment:', error)
    res.status(500).send('Error al cargar la vista de edición')
  }
}

// Actualizar matrícula
exports.updateEnrollment = async (req, res, next) => {
  try {
    // Verificamos si el usuario ya tiene otra matrícula distinta a la que estamos editando
    const existingEnrollment = await enrollmentService.getEnrollmentByUserId(req.body.userId)
    if (existingEnrollment && existingEnrollment._id.toString() !== req.params.id) {
      const error = new Error(`El usuario ya tiene una matrícula activa`)
      error.status = 400
      error.source = 'Actualizar matrícula'
      return next(error)
    }

    await enrollmentService.updateEnrollment(req.params.id, req.body)
    res.redirect(baseUrlEnrollments)
  } catch (error) {
    next(error)
  }
}

// Eliminar matrícula
exports.deleteEnrollment = async (req, res) => {
  try {
    await enrollmentService.deleteEnrollment(req.params.id)
    res.redirect(baseUrlEnrollments)
  } catch (error) {
    console.error('Error en deleteEnrollment:', error)
    res.status(500).send('Error al eliminar la matricula')
  }
}
