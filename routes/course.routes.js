const express = require('express')
const router = express.Router()
const courseController = require('../controllers/course.controller')

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Obtener todos los cursos
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lista de cursos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', courseController.getAllCourses)

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Crear un nuevo curso
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - startDate
 *               - endDate
 *               - location
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introducción a JavaScript
 *               description:
 *                 type: string
 *                 example: Curso completo de JavaScript desde cero
 *               category:
 *                 type: string
 *                 example: Programación
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-01-15T09:00:00.000Z'
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-03-15T18:00:00.000Z'
 *               location:
 *                 type: string
 *                 example: Aula 101
 *     responses:
 *       201:
 *         description: Curso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', courseController.createCourse)

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Obtener un curso por ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Curso obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', courseController.getCourseById)

/**
 * @swagger
 * /courses/{id}:
 *   patch:
 *     summary: Actualizar un curso existente
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *         example: '507f1f77bcf86cd799439011'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Introducción a JavaScript Avanzado
 *               description:
 *                 type: string
 *                 example: Curso completo de JavaScript avanzado
 *               category:
 *                 type: string
 *                 example: Programación Avanzada
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-02-01T09:00:00.000Z'
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: '2024-04-01T18:00:00.000Z'
 *               location:
 *                 type: string
 *                 example: Aula 201
 *     responses:
 *       200:
 *         description: Curso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.patch('/:id', courseController.updateCourse)

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Eliminar un curso
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del curso
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Curso eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Curso eliminado exitosamente
 *       404:
 *         description: Curso no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', courseController.deleteCourse)

// Vistas (no documentadas en Swagger ya que son para renderizado de vistas)
router.get('/new', courseController.showCreateForm)
router.get('/:id/edit', courseController.showEditForm)

module.exports = router
