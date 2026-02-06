const express = require('express')
const router = express.Router()
const userApiController = require('../../controllers/api/user.api.controller')
const { verifyToken } = require('../../middlewares/jwt.mw')
const { authorize } = require('../../middlewares/role.mw')

// API JSON
router.get(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  userApiController.getAllUsers
)
// router.post('/', userApiController.createUser) // Eliminado por redundancia y falta de implementación
router.post('/register', userApiController.registerUser)
router.post('/login', userApiController.loginUser)
router.post('/logout', verifyToken, userApiController.logoutUser)
router.get(
  '/show/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  userApiController.getById
)
router.put(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  userApiController.editUser
)
router.delete(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR'),
  userApiController.deleteUser
)

module.exports = router
