const express = require('express')
const router = express.Router()
const enrollmentController = require('../controllers/enrollment.controller')
const { verifyToken } = require('../middlewares/jwt.mw')
const { authorize } = require('../middlewares/role.mw')

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
router.get(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  enrollmentController.getAllEnrollments
)

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
router.post(
  '/',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollmentController.createEnrollment
)

// Vistas (rutas específicas deben ir ANTES de las dinámicas)
router.get(
  '/new',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollmentController.showNewEnrollment
)

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
router.get(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'),
  enrollmentController.getEnrollmentById
)

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
router.put(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollmentController.updateEnrollment
)
router.delete(
  '/:id',
  verifyToken,
  authorize('ADMINISTRADOR'),
  enrollmentController.deleteEnrollment
)

// Vistas (rutas específicas deben ir ANTES de las dinámicas)
router.get(
  '/:id/edit',
  verifyToken,
  authorize('ADMINISTRADOR', 'PROFESOR'),
  enrollmentController.showEditEnrollment
)

module.exports = router
