const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller')

// Rutas
//GET /courses
router.get('/', courseController.getAllCourses)
router.get('/:id', courseController.getCourseById)

//POST y PATCH /courses
router.post('/', courseController.createCourse)
router.patch('/:id', courseController.updateCourse)

//DELETE /courses
router.delete('/:id', courseController.deleteCourse)

module.exports = router
