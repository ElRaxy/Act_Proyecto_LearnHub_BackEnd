const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollement.controller')

/**
 * @swagger
 * /enrollments:
 *   get:
 *     summary: Obtener todas las inscripciones
 *     tags: [Enrollments]
 *     responses:
 *       200:
 *         description: Lista de inscripciones obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Enrollment'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', enrollmentController.getAllEnrollments)

/**
 * @swagger
 * /enrollments:
 *   post:
 *     summary: Crear una nueva inscripción
 *     tags: [Enrollments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - courseId
 *               - enrollmentsDate
 *               - status
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario
 *                 example: '507f1f77bcf86cd799439011'
 *               courseId:
 *                 type: string
 *                 description: ID del curso
 *                 example: '507f1f77bcf86cd799439012'
 *               enrollmentsDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inscripción
 *                 example: '2024-01-10T10:00:00.000Z'
 *               status:
 *                 type: string
 *                 enum: [pendiente, aprobado, rechazado]
 *                 description: Estado de la inscripción
 *                 example: pendiente
 *               notes:
 *                 type: string
 *                 description: Notas adicionales
 *                 example: Estudiante interesado en el curso
 *     responses:
 *       201:
 *         description: Inscripción creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
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
router.post('/', enrollmentController.createEnrollment)

/**
 * @swagger
 * /enrollments/{id}:
 *   get:
 *     summary: Obtener una inscripción por ID
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la inscripción
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Inscripción obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Inscripción no encontrada
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
router.get('/:id', enrollmentController.getEnrollmentById)

/**
 * @swagger
 * /enrollments/{id}:
 *   put:
 *     summary: Actualizar una inscripción existente
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la inscripción
 *         example: '507f1f77bcf86cd799439011'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID del usuario
 *                 example: '507f1f77bcf86cd799439011'
 *               courseId:
 *                 type: string
 *                 description: ID del curso
 *                 example: '507f1f77bcf86cd799439012'
 *               enrollmentsDate:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha de inscripción
 *                 example: '2024-01-10T10:00:00.000Z'
 *               status:
 *                 type: string
 *                 enum: [pendiente, aprobado, rechazado]
 *                 description: Estado de la inscripción
 *                 example: aprobado
 *               notes:
 *                 type: string
 *                 description: Notas adicionales
 *                 example: Inscripción aprobada por el administrador
 *     responses:
 *       200:
 *         description: Inscripción actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Inscripción no encontrada
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
router.put('/:id', enrollmentController.updateEnrollment)

/**
 * @swagger
 * /enrollments/{id}:
 *   delete:
 *     summary: Eliminar una inscripción
 *     tags: [Enrollments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la inscripción
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Inscripción eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Inscripción eliminada exitosamente
 *       404:
 *         description: Inscripción no encontrada
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
router.delete('/:id', enrollmentController.deleteEnrollment)

// Vistas (no documentadas en Swagger ya que son para renderizado de vistas)
router.get('/new', enrollmentController.showNewEnrollment)
router.get('/:id/edit', enrollmentController.showEditEnrollment)

module.exports = router
