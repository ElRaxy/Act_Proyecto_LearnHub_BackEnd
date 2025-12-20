const express = require('express')
const router = express.Router()
const enrollmentApiController = require('../../controllers/api/enrollment.api.controller')

/**
 * @openapi
 * /enrollments:
 *   get:
 *     summary: Obtener todas las matrículas
 *     tags: [API - Enrollments]

 *     responses:
 *       200:
 *         description: Lista de matrículas obtenida exitosamente
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
router.get('/', enrollmentApiController.getAllEnrollments)

/**
 * @openapi
 * /enrollments:
 *   post:
 *     summary: Crear una nueva matrícula
 *     tags: [API - Enrollments]

 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       201:
 *         description: Matrícula creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: El usuario ya tiene una matrícula activa
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
router.post('/', enrollmentApiController.createEnrollment)

/**
 * @openapi
 * /enrollments/show/{id}:
 *   get:
 *     summary: Obtener una matrícula por ID
 *     tags: [API - Enrollments]
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la matrícula
 *         example: '507f1f77bcf86cd799439031'
 *     responses:
 *       200:
 *         description: Matrícula obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Matrícula no encontrada
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
router.get('/show/:id', enrollmentApiController.getEnrollmentById)

/**
 * @openapi
 * /enrollments/{id}:
 *   put:
 *     summary: Actualizar una matrícula existente
 *     tags: [API - Enrollments]
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la matrícula
 *         example: '507f1f77bcf86cd799439031'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Enrollment'
 *     responses:
 *       200:
 *         description: Matrícula actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Enrollment'
 *       400:
 *         description: El usuario ya tiene una matrícula activa
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Matrícula no encontrada
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
router.put('/:id', enrollmentApiController.updateEnrollment)

/**
 * @openapi
 * /enrollments/{id}:
 *   delete:
 *     summary: Eliminar una matrícula
 *     tags: [API - Enrollments]
 *     parameters:

 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la matrícula
 *         example: '507f1f77bcf86cd799439031'
 *     responses:
 *       200:
 *         description: Matrícula eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Matrícula eliminada exitosamente'
 *                 enrollment:
 *                   $ref: '#/components/schemas/Enrollment'
 *       404:
 *         description: Matrícula no encontrada
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
router.delete('/:id', enrollmentApiController.deleteEnrollment)

module.exports = router
