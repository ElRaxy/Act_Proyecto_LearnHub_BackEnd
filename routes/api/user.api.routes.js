const express = require('express')
const router = express.Router()
const userApiController = require('../../controllers/api/user.api.controller')
const { verifyToken } = require('../../middlewares/jwt.mw')

// API JSON
router.get('/', verifyToken, userApiController.getAllUsers)
// router.post('/', userApiController.createUser) // Eliminado por redundancia y falta de implementación
router.post('/register', userApiController.registerUser)
router.post('/login', userApiController.loginUser)
router.post('/logout', userApiController.logoutUser)
router.get('/show/:id', verifyToken, userApiController.getById)
router.put('/:id', verifyToken, userApiController.editUser)
router.delete('/:id', verifyToken, userApiController.deleteUser)

module.exports = router
