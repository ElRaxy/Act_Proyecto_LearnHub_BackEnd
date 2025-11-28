const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller')

// Vistas
router.get('/new', courseController.showCreateForm)
router.get('/:id/edit', courseController.showEditForm)
router.get('/:id', courseController.getCourseById)

// CRUD reales
router.get('/', courseController.getAllCourses)
router.post('/', courseController.createCourse)
router.patch('/:id', courseController.updateCourse)
router.delete('/:id', courseController.deleteCourse)

module.exports = router
