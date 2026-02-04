const express = require('express')
const router = express.Router()
const enrollmentApiController = require('../../controllers/api/enrollment.api.controller')
const { verifyToken } = require('../../middlewares/jwt.mw')
const { authorize } = require('../../middlewares/role.mw')

// API JSON
router.get(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  enrollmentApiController.getAllEnrollments
)
router.post(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollmentApiController.createEnrollment
)
router.get(
  '/show/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  enrollmentApiController.getEnrollmentById
)
router.put(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollmentApiController.updateEnrollment
)
router.delete(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR'),
  enrollmentApiController.deleteEnrollment
)

module.exports = router
