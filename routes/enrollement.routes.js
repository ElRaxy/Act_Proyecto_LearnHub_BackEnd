const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollement.controller')

router.get('/', enrollmentController.getAllEnrollments)
router.get('/new', enrollmentController.showNewEnrollment)
router.post('/', enrollmentController.createEnrollment)
router.get('/:id', enrollmentController.getEnrollmentById)
router.get('/:id/edit', enrollmentController.showEditEnrollment)
router.put('/:id', enrollmentController.updateEnrollment)
router.delete('/:id', enrollmentController.deleteEnrollment)

module.exports = router
