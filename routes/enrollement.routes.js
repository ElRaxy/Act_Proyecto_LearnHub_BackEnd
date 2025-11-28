const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollement.controller')

// Rutas
//GET /enrollments
router.get('/', enrollmentController.getAllEnrollments)
router.get('/:id', enrollmentController.getEnrollmentById)

//POST y PATCH /enrollments
router.post('/', enrollmentController.createEnrollment)
router.patch('/:id', enrollmentController.updateEnrollment)

//DELETE /enrollments
router.delete('/:id', enrollmentController.deleteEnrollment)

module.exports = router
