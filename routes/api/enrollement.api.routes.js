const express = require('express')
const router = express.Router()
const enrollementApiController = require('../../controllers/api/enrollement.api.controller')
const { verifyToken } = require('../../middlewares/jwt.mw')
const { authorize } = require('../../middlewares/role.mw')

// API JSON
router.get(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  enrollementApiController.getAllEnrollments
)
router.post(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollementApiController.createEnrollment
)
router.get(
  '/show/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  enrollementApiController.getEnrollmentById
)
router.put(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollementApiController.updateEnrollment
)
router.delete(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR'),
  enrollementApiController.deleteEnrollment
)

module.exports = router
