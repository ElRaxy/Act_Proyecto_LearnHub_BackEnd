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
exports.createEnrollment = async (req, res) => {
  try {
    await enrollmentService.createEnrollment({
      userId: req.body.userId,
      courseId: req.body.courseId,
      enrollmentsDate: req.body.enrollmentsDate,
      status: req.body.status,
      notes: req.body.notes,
    })

    res.redirect(baseUrlEnrollments)
  } catch (error) {
    console.error('Error en createEnrollment:', error)
    // Manejo de duplicados
    if (error.code === 11000) {
      return res
        .status(400)
        .send('Ya existe una matrícula para este usuario y curso')
    }
    res.status(500).send('Error al crear la matricula')
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
exports.updateEnrollment = async (req, res) => {
  try {
    await enrollmentService.updateEnrollment(req.params.id, req.body)
    res.redirect(`${baseUrlEnrollments}/${req.params.id}`)
  } catch (error) {
    console.error('Error en updateEnrollment:', error)
    res.status(500).send('Error al actualizar la matricula')
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

// // Opcionales: buscar matrículas por usuario o curso
// exports.findByUser = async (req, res) => {
//   try {
//     const enrollments = await enrollmentService.getAllEnrollmentsByUser(req.params.id)
//     res.status(200).json(enrollments)
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener todos las matriculas' })
//   }
// }

// exports.findByCourse = async (req, res) => {
//   try {
//     const enrollments = await enrollmentService.getAllEnrollmentsByCourse(req.params.id)
//     res.status(200).json(enrollments)
//   } catch (error) {
//     res.status(500).json({ error: 'Error al obtener todas las matriculas' })
//   }
// }
