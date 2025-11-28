const e = require('cors')
const courseService = require('../services/course.service')

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-ES')
}

exports.getAllCourses = async (req, res) => {
  const courses = await courseService.getAllCourses()
  res.render('courses/index', { courses, formatDate })
}

exports.getCourseById = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id)
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' })
  }
}

exports.showNewCourse = async (req, res) => {
  res.locals.tituloEJS = 'Nuevo Curso'
  res.render('courses/new')
}

exports.createCourse = async (req, res) => {
  try {
    const course = await courseService.createCourse(req.body)
    res.status(201).json(course)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el curso' })
  }
}

exports.showEditCourse = async (req, res) => {
  try {
    const course = await courseService.getCourseById(req.params.id)
    res.locals.tituloEJS = 'Editar Curso'
    res.render('courses/edit', { course })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el curso' })
  }
}

exports.updateCourse = async (req, res) => {
  try {
    const course = await courseService.updateCourse(req.params.id, req.body)
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el curso' })
  }
}

exports.deleteCourse = async (req, res) => {
  try {
    const course = await courseService.deleteCourse(req.params.id)
    res.status(200).json(course)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el curso' })
  }
}

exports.findByUser = async (req, res) => {
  try {
    const courses = await courseService.getAllCoursesByUser(req.params.id)
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los cursos' })
  }
}

exports.findByEnrollment = async (req, res) => {
  try {
    const courses = await courseService.getAllCoursesByEnrollment(req.params.id)
    res.status(200).json(courses)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener todos los cursos' })
  }
}
