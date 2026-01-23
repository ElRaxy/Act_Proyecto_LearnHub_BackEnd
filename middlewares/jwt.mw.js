require("dotenv").config();
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.verifyToken = (req, res, next) => {
  let token = null;

  // 1. Buscar token en el header Authorization (API)
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // 2. Buscar token en cookies (Vistas RSS)
  if (!token && req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // Si no hay token...
  if (!token) {
    // Si la ruta empieza por /api, devolvemos error JSON 401
    if (req.originalUrl.startsWith("/api")) {
      return next(new AppError("No se ha proporcionado un token", 401));
    }
    // Si es una vista, redirigimos al login
    return res.redirect("/users/rss/login");
  }

  try {
    // Validar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; //. payload --> req.user
    res.locals.user = decoded; // Disponible en EJS
    next(); //.TODO OK -> next()
  } catch (error) {
    if (req.originalUrl.startsWith("/api")) {
      return next(new AppError("Token inválido o expirado", 401));
    }
    res.clearCookie("token");
    res.redirect("/users/rss/login");
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.profile === "ADMINISTRADOR") {
    return next();
  }

  const error = new AppError(
    "No tienes permisos de administrador para realizar esta acción",
    403,
  );
  error.source = "Autorización";

  if (req.originalUrl.startsWith("/api")) {
    return next(error);
  }

  next(error); // El middleware global de errores manejará el renderizado
};
