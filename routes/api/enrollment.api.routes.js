const express = require('express')
const router = express.Router()
const enrollmentApiController = require('../../controllers/api/enrollment.api.controller')


// API JSON
router.get('/', enrollmentApiController.getAllEnrollments)
router.post('/', enrollmentApiController.createEnrollment)
router.get('/show/:id', enrollmentApiController.getEnrollmentById)
router.put('/:id', enrollmentApiController.updateEnrollment)
router.delete('/:id', enrollmentApiController.deleteEnrollment)

module.exports = router
