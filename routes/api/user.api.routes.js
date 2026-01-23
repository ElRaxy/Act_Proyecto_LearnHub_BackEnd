const express = require("express");
const router = express.Router();
const userApiController = require("../../controllers/api/user.api.controller");
const { verifyToken, isAdmin } = require("../../middlewares/jwt.mw");

// API JSON
router.get("/", verifyToken, userApiController.getAllUsers);
router.post("/", verifyToken, isAdmin, userApiController.createUser);
router.get("/show/:id", verifyToken, userApiController.getById);
router.put("/:id", verifyToken, isAdmin, userApiController.editUser);
router.delete("/:id", verifyToken, isAdmin, userApiController.deleteUser);

// Auth API (añadiendo por si acaso se quieren usar por separado)
router.post("/login", userApiController.loginUser);
router.post("/register", userApiController.registerUser);
router.get("/logout", userApiController.logoutUser);

module.exports = router;
