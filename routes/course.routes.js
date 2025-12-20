const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller')

/**
 * @swagger
 * /courses/rss:
 *   get:
 *     summary: Renderiza la vista con el listado de cursos (HTML)
 *     description: Ruta que renderiza una vista EJS con todos los cursos
 *     tags: [Vistas - Courses]
 */
router.get('/', courseController.getAllCourses)

/**
 * @swagger
 * /courses/rss:
 *   post:
 *     summary: Crea un nuevo curso y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa el formulario de creación y redirige
 *     tags: [Vistas - Courses]
 */
router.post('/', courseController.createCourse)

/**
 * @swagger
 * /courses/rss/new:
 *   get:
 *     summary: Renderiza el formulario de creación de curso (HTML)
 *     description: Ruta que renderiza una vista EJS con el formulario para crear un nuevo curso
 *     tags: [Vistas - Courses]
 */
router.get('/new', courseController.showCreateForm)

/**
 * @swagger
 * /courses/rss/{id}:
 *   get:
 *     summary: Renderiza la vista de detalle de un curso (HTML)
 *     description: Ruta que renderiza una vista EJS con los detalles de un curso específico
 *     tags: [Vistas - Courses]
 */
router.get('/:id', courseController.getCourseById)

/**
 * @swagger
 * /courses/rss/{id}:
 *   patch:
 *     summary: Actualiza un curso y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa el formulario de edición y redirige
 *     tags: [Vistas - Courses]
 */
router.patch('/:id', courseController.updateCourse)

/**
 * @swagger
 * /courses/rss/{id}:
 *   delete:
 *     summary: Elimina un curso y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa la eliminación de un curso y redirige
 *     tags: [Vistas - Courses]
 */
router.delete('/:id', courseController.deleteCourse)

/**
 * @swagger
 * /courses/rss/{id}/edit:
 *   get:
 *     summary: Renderiza el formulario de edición de curso (HTML)
 *     description: Ruta que renderiza una vista EJS con el formulario para editar un curso existente
 *     tags: [Vistas - Courses]
 */
router.get('/:id/edit', courseController.showEditForm)

module.exports = router
