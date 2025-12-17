const express = require('express')
const router = express.Router()
const enrollementApiController = require('../../controllers/api/enrollement.api.controller')


// API JSON
router.get('/', enrollementApiController.getAllEnrollments)
router.post('/', enrollementApiController.createEnrollment)
router.get('/show/:id', enrollementApiController.getEnrollmentById)
router.put('/:id', enrollementApiController.showEditEnrollment)
router.delete('/:id', enrollementApiController.deleteEnrollment)

module.exports = router
