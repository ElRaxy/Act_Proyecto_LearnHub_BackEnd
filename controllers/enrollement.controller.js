const courseService = require('../services/course.service')
const enrollmentService = require('../services/enrollement.service')

exports.getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments()
    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los cursos' })
  }
}

exports.getEnrollmentById = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    res.status(200).json(enrollment)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' })
  }
}

exports.showNewEnrollment = async (req, res) => {
  res.locals.tituloEJS = 'Nueva Matricula'
  res.render('enrollments/new')
}

exports.createEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.createEnrollment(req.body)
    res.status(201).json(enrollment)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la matricula' })
  }
}

exports.showEditEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id)
    res.locals.tituloEJS = 'Editar Matricula'
    res.render('enrollments/edit', { enrollment })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la matricula' })
  }
}

exports.updateEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.updateEnrollment(req.params.id, req.body)
    res.status(200).json(enrollment)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la matricula' })
  }
}

exports.deleteEnrollment = async (req, res) => {
  try {
    const enrollment = await enrollmentService.deleteEnrollment(req.params.id)
    res.status(200).json(enrollment)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la matricula' })
  }
}

exports.findByUser = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollmentsByUser(req.params.id)
    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos las matriculas' })
  }
}

exports.findByCourse = async (req, res) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollmentsByCourse(req.params.id)
    res.status(200).json(enrollments)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todas las matriculas' })
  }
}
