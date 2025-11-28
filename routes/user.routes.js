const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')

// Listar usuarios
router.get('/', userController.getAllUsers)
// Formulario nuevo usuario
router.get('/new', userController.showNewUser)
// Crear usuario
router.post('/', userController.createUser)
// Editar usuario
router.get('/:id/edit', userController.showEditUser)
// Actualizar usuario
router.put('/:id', userController.editUser)
// Borrar usuario
router.delete('/:id', userController.deleteUser)
// Buscar por DNI
router.get('/dni/:dni', userController.findByDni)

module.exports = router