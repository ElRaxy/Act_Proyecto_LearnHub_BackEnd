const express = require('express')
const router = express.Router()
const userController = require('../controllers/user.controller')


/**
 * @swagger
 * /users/rss:
 *   get:
 *     summary: Renderiza la vista con el listado de usuarios (HTML)
 *     description: Ruta que renderiza una vista EJS con todos los usuarios
 *     tags: [Vistas - Users]
 */
router.get('/', userController.getAllUsers)

/**
 * @swagger
 * /users/rss:
 *   post:
 *     summary: Crea un nuevo usuario y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa el formulario de creación y redirige
 *     tags: [Vistas - Users]
 */
router.post('/', userController.createUser)

/**
 * @swagger
 * /users/rss/new:
 *   get:
 *     summary: Renderiza el formulario de creación de usuario (HTML)
 *     description: Ruta que renderiza una vista EJS con el formulario para crear un nuevo usuario
 *     tags: [Vistas - Users]
 */
router.get('/new', userController.showNewUser)

/**
 * @swagger
 * /users/rss/edit/{id}:
 *   get:
 *     summary: Renderiza el formulario de edición de usuario (HTML)
 *     description: Ruta que renderiza una vista EJS con el formulario para editar un usuario existente
 *     tags: [Vistas - Users]
 */
router.get('/edit/:id', userController.showEditUser)

/**
 * @swagger
 * /users/rss/show/{id}:
 *   get:
 *     summary: Renderiza la vista de detalle de un usuario (HTML)
 *     description: Ruta que renderiza una vista EJS con los detalles de un usuario específico
 *     tags: [Vistas - Users]
 */
router.get('/show/:id', userController.getById)

/**
 * @swagger
 * /users/rss/{id}:
 *   put:
 *     summary: Actualiza un usuario y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa el formulario de edición y redirige
 *     tags: [Vistas - Users]
 */
router.put('/:id', userController.editUser)

/**
 * @swagger
 * /users/rss/{id}:
 *   delete:
 *     summary: Elimina un usuario y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa la eliminación de un usuario y redirige
 *     tags: [Vistas - Users]
 */
router.delete('/:id', userController.deleteUser)



module.exports = router
