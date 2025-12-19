const enrollmentService = require('../../services/enrollment.service')

// Listar todas las matrículas
exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments()
    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo matriculas: ' + error.message })
  }
}

// Crear matrícula
exports.createEnrollment = async (req, res) => {
  try {
    // Verificamos si el usuario ya tiene matrícula
    const existingEnrollment = await enrollmentService.getEnrollmentByUserId(req.body.userId)
    if (existingEnrollment) {
      return res.status(400).json({ error: 'El usuario ya tiene una matrícula activa' })
    }

    const newEnrollment = await enrollmentService.createEnrollment(req.body)
    res.status(201).json(newEnrollment)
  } catch (error) {
    // Manejar errores específicos del servicio
    if (error.message === 'El usuario ya está matriculado en otro curso') {
      return res.status(400).json({ error: error.message })
    }
    res.status(500).json({ error: 'Error creando matrícula: ' + error.message })
  }
}


// Actualizar matrícula
exports.updateEnrollment = async (req, res) => {
  try {
    // Verificar que la matrícula existe
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: `Matrícula con ID '${req.params.id}' no encontrada` })
    }

    // Verificamos si el usuario ya tiene otra matrícula distinta a la que estamos editando
    if (req.body.userId) {
      const existingEnrollment = await enrollmentService.getEnrollmentByUserId(req.body.userId)
      if (existingEnrollment && existingEnrollment._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'El usuario ya tiene una matrícula activa' })
      }
    }

    const updatedEnrollment = await enrollmentService.updateEnrollment(req.params.id, req.body)
    res.status(200).json(updatedEnrollment)
  } catch (error) {
    // Manejar errores específicos del servicio
    if (error.message && error.message.includes('no encontrada')) {
      return res.status(404).json({ error: error.message })
    }
    res.status(500).json({ error: 'Error actualizando matrícula: ' + error.message })
  }
}

// Eliminar matrícula
exports.deleteEnrollment = async (req, res) => {
  try {
    // Verificar que la matrícula existe antes de eliminar
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: `Matrícula con ID '${req.params.id}' no encontrada` })
    }

    const deletedEnrollment = await enrollmentService.deleteEnrollment(req.params.id)
    res.status(200).json({ message: 'Matrícula eliminada exitosamente', enrollment: deletedEnrollment })
  } catch (error) {
    // Manejar errores específicos del servicio
    if (error.message && error.message.includes('no encontrada')) {
      return res.status(404).json({ error: error.message })
    }
    res.status(500).json({ error: 'Error eliminando matrícula: ' + error.message })
  }
}

// Detalle matrícula
exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: `Matrícula con ID '${req.params.id}' no encontrada` })
    }
    res.status(200).json(enrollment)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo matrícula: ' + error.message })
  }
}
