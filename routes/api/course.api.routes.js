const express = require('express')
const router = express.Router()
const courseApiController = require('../../controllers/api/course.api.controller')

// API JSON
router.get('/', courseApiController.getAllCourses)
router.post('/', courseApiController.createCourse)
router.get('/show/:id', courseApiController.getCourseById)
router.put('/:id', courseApiController.updateCourse )
router.delete('/:id', courseApiController.deleteCourse)

module.exports = router
