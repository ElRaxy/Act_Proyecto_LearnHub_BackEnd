const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollment.controller')

/**
 * @swagger
 * /enrollments/rss:
 *   get:
 *     summary: Renderiza la vista con el listado de matrículas (HTML)
 *     description: Ruta que renderiza una vista EJS con todas las matrículas
 *     tags: [Vistas - Enrollments]
 */
router.get('/', enrollmentController.getAllEnrollments)

/**
 * @swagger
 * /enrollments/rss:
 *   post:
 *     summary: Crea una nueva matrícula y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa el formulario de creación y redirige
 *     tags: [Vistas - Enrollments]
 */
router.post('/', enrollmentController.createEnrollment)

/**
 * @swagger
 * /enrollments/rss/new:
 *   get:
 *     summary: Renderiza el formulario de creación de matrícula (HTML)
 *     description: Ruta que renderiza una vista EJS con el formulario para crear una nueva matrícula
 *     tags: [Vistas - Enrollments]
 */
router.get('/new', enrollmentController.showNewEnrollment)

/**
 * @swagger
 * /enrollments/rss/{id}:
 *   get:
 *     summary: Renderiza la vista de detalle de una matrícula (HTML)
 *     description: Ruta que renderiza una vista EJS con los detalles de una matrícula específica
 *     tags: [Vistas - Enrollments]
 */
router.get('/:id', enrollmentController.getEnrollmentById)

/**
 * @swagger
 * /enrollments/rss/{id}:
 *   put:
 *     summary: Actualiza una matrícula y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa el formulario de edición y redirige
 *     tags: [Vistas - Enrollments]
 */
router.put('/:id', enrollmentController.updateEnrollment)

/**
 * @swagger
 * /enrollments/rss/{id}:
 *   delete:
 *     summary: Elimina una matrícula y redirige a la vista de listado (HTML)
 *     description: Ruta que procesa la eliminación de una matrícula y redirige
 *     tags: [Vistas - Enrollments]
 */
router.delete('/:id', enrollmentController.deleteEnrollment)

/**
 * @swagger
 * /enrollments/rss/{id}/edit:
 *   get:
 *     summary: Renderiza el formulario de edición de matrícula (HTML)
 *     description: Ruta que renderiza una vista EJS con el formulario para editar una matrícula existente
 *     tags: [Vistas - Enrollments]
 */
router.get('/:id/edit', enrollmentController.showEditEnrollment)

module.exports = router
