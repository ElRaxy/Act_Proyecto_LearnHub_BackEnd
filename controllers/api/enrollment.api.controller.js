const enrollmentService = require('../../services/enrollment.service')
const userService = require('../../services/user.service')
const courseService = require('../../services/course.service')
const baseUrlEnrollments = `/api/${process.env.API_VERSION}/enrollments`

// Listar todas las matrículas
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments()
    res.locals.tituloEJS = 'Matriculas'
    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({error:'No se pudieron listar las matriculas'})
  }
}

// // Formulario nueva matrícula
// exports.showNewEnrollment = async (req, res) => {
//   try {
//     const users = await userService.getAllUsers()
//     const courses = await courseService.getAllCourses()
//     res.locals.tituloEJS = 'Nueva Matricula'
//     res.status(200).json(enrollment)
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({error: 'Error al cargar la vista de nueva matrícula'})
//   }
// }

// Crear matrícula
exports.createEnrollment = async (req, res) => {
  try {
    // Verificamos si el usuario ya tiene matrícula
    const existingEnrollment = await enrollmentService.getEnrollmentByUserId(req.body.userId)
    if (existingEnrollment) {
      return res.status(400).json({error: 'El usuario ya tiene una matrícula activa'})
    }

    const newEnrollment = await enrollmentService.createEnrollment(req.body)
    res.status(201).json(newEnrollment)
  } catch (error) {
    console.error(error)
    // Manejar errores específicos del servicio
    if (error.message === 'El usuario ya está matriculado en otro curso') {
      return res.status(400).json({error: error.message})
    }
    res.status(500).json({error: 'Error al crear matrícula'})
  }
}

// // Formulario editar matrícula
// exports.showEditEnrollment = async (req, res) => {
//   try {
//     const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
//     if (!enrollment) return res.status(404).json({error:'No se encontró la matricula'})
//     const users = await userService.getAllUsers()
//     const courses = await courseService.getAllCourses()
//     res.locals.tituloEJS = 'Editar Matricula'
//     res.render('enrollments/edit', { enrollment, baseApi: baseUrlEnrollments, users, courses })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({error: 'Error al cargar la vista de edición' })
//   }
// }

// Actualizar matrícula
exports.updateEnrollment = async (req, res) => {
  try {
    // Verificar que la matrícula existe
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({error: `Matrícula con ID '${req.params.id}' no encontrada`})
    }

    // Verificamos si el usuario ya tiene otra matrícula distinta a la que estamos editando
    if (req.body.userId) {
      const existingEnrollment = await enrollmentService.getEnrollmentByUserId(req.body.userId)
      if (existingEnrollment && existingEnrollment._id.toString() !== req.params.id) {
        return res.status(400).json({error: 'El usuario ya tiene una matrícula activa'})
      }
    }

    const updatedEnrollment = await enrollmentService.updateEnrollment(req.params.id, req.body)
    if (!updatedEnrollment) {
      return res.status(500).json({error: 'Error al actualizar la matrícula'})
    }
    res.status(200).json(updatedEnrollment)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Error al actualizar matrícula'})
  }
}

// Eliminar matrícula
exports.deleteEnrollment = async (req, res) => {
  try {
    // Verificar que la matrícula existe antes de eliminar
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({error: `Matrícula con ID '${req.params.id}' no encontrada`})
    }

    const deletedEnrollment = await enrollmentService.deleteEnrollment(req.params.id)
    if (!deletedEnrollment) {
      return res.status(500).json({error: 'Error al eliminar la matrícula'})
    }
    res.status(200).json({message: 'Matrícula eliminada exitosamente', enrollment: deletedEnrollment})
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Error al eliminar la matricula'})
  }
}

// Detalle matrícula
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollmentDeleted = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollmentDeleted) return res.status(404).json({error: 'No se encontró la matricula'})
    res.locals.tituloEJS = 'Detalle de la Matricula'
    //res.render('enrollments/show', { enrollment, baseApi: baseUrlEnrollments })
    res.status(200).json(enrollmentDeleted)
  } catch (error) {
    console.error(error)
    res.status(500).json({error: 'Error al obtener la matricula'})
  }
}
