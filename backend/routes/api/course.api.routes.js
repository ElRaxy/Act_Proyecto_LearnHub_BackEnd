const express = require('express')
const router = express.Router()
const courseApiController = require('../../controllers/api/course.api.controller')
const { verifyToken } = require('../../middlewares/jwt.mw')
const { authorize } = require('../../middlewares/role.mw')

// API JSON
router.get(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  courseApiController.getAllCourses
)
router.post(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  courseApiController.createCourse
)
router.get(
  '/show/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  courseApiController.getCourseById
)
router.put(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  courseApiController.updateCourse
)
router.delete(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR'),
  courseApiController.deleteCourse
)

module.exports = router
