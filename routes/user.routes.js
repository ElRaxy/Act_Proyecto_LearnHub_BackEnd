const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

router.get('/users', userController.getAllUsers)
router.get('/users/:id', userController.getById)
router.get('/users/dni/:dni', userController.findByDni)
router.get('/users/new', userController.showNewUser)
router.post('/users', userController.createUser)
router.get('/users/:id/edit', userController.showEditUser)
router.put('/users/:id', userController.editUser)
router.delete('/users/:id', userController.deleteUser)

module.exports = router