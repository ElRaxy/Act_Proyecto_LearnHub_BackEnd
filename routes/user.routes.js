const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/jwt.mw");
const { authorize } = require("../middlewares/role.mw");

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Error del servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get(
  "/",
  verifyToken,
  authorize("ADMINISTRADOR", "PROFESOR", "ALUMNO"),
  userController.getAllUsers,
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dni
 *               - firstName
 *               - lastName
 *               - email
 *               - phone
 *               - birthDate
 *               - profile
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del usuario (9 caracteres)
 *                 example: '12345678a'
 *                 minLength: 9
 *                 maxLength: 9
 *               firstName:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: 'Juan'
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: 'Pérez'
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: 'juan.perez@example.com'
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario
 *                 example: '612345678'
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento
 *                 example: '1990-05-15'
 *               profile:
 *                 type: string
 *                 enum: [ADMINISTRADOR, PROFESOR, ALUMNO]
 *                 description: Perfil del usuario
 *                 example: 'ALUMNO'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Datos inválidos o usuario ya existe
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
  "/",
  verifyToken,
  authorize("ADMINISTRADOR", "PROFESOR"),
  userController.createUser,
);

// Vistas (rutas específicas deben ir ANTES de las dinámicas)
router.get(
  "/new",
  verifyToken,
  authorize("ADMINISTRADOR", "PROFESOR"),
  userController.showNewUser,
);
router.get(
  "/edit/:id",
  verifyToken,
  authorize("ADMINISTRADOR", "PROFESOR"),
  userController.showEditUser,
);

/**
 * @swagger
 * /users/show/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Usuario obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
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
  "/show/:id",
  verifyToken,
  authorize("ADMINISTRADOR", "PROFESOR", "ALUMNO"),
  userController.getById,
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *         example: '507f1f77bcf86cd799439011'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 description: DNI del usuario (9 caracteres)
 *                 example: '12345678a'
 *               firstName:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: 'Juan Carlos'
 *               lastName:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: 'Pérez García'
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario
 *                 example: 'juan.perez@example.com'
 *               phone:
 *                 type: string
 *                 description: Teléfono del usuario
 *                 example: '612345679'
 *               birthDate:
 *                 type: string
 *                 format: date
 *                 description: Fecha de nacimiento
 *                 example: '1990-05-15'
 *               profile:
 *                 type: string
 *                 enum: [ADMINISTRADOR, PROFESOR, ALUMNO]
 *                 description: Perfil del usuario
 *                 example: 'PROFESOR'
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: Usuario no encontrado
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
  "/:id",
  verifyToken,
  authorize("ADMINISTRADOR", "PROFESOR"),
  userController.editUser,
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *         example: '507f1f77bcf86cd799439011'
 *     responses:
 *       200:
 *         description: Usuario eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Usuario eliminado exitosamente
 *       404:
 *         description: Usuario no encontrado
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
router.delete(
  "/:id",
  verifyToken,
  authorize("ADMINISTRADOR"),
  userController.deleteUser,
);

router.get("/login", userController.showLogin);
router.post("/login", userController.loginUser);
router.get("/register", userController.showNewUser);
router.post("/register", userController.registerUser);
router.get("/logout", userController.logoutUser);

module.exports = router;
