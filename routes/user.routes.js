const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// Listar todos los usuarios
router.get('/', userController.getAllUsers)

// Formulario nuevo usuario
router.get('/new', userController.showNewUser)

// Crear usuario
router.post('/', userController.createUser)

// Formulario edición usuario
router.get('/edit/:id', userController.showEditUser)

// Actualizar usuario
router.put('/:id', userController.editUser)

// Borrar usuario
router.delete('/:id', userController.deleteUser)

// Ver usuario
router.get('/show/:id', userController.getById)

module.exports = router
