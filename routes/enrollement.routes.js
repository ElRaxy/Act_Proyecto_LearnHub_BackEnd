const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollement.controller')

//Vistas
router.get('/new', enrollmentController.showNewEnrollment)
router.get('/:id/edit', enrollmentController.showEditEnrollment)
router.get('/:id', enrollmentController.getEnrollmentById)

//CRUD reales
router.get('/', enrollmentController.getAllEnrollments)
router.post('/', enrollmentController.createEnrollment)
router.patch('/:id', enrollmentController.updateEnrollment)
router.delete('/:id', enrollmentController.deleteEnrollment)
module.exports = router
