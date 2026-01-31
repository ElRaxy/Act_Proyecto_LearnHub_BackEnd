const AppError = require("../utils/AppError");

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.profile) {
      const error = new AppError("No autorizado - Perfil no encontrado", 401);
      if (req.originalUrl.includes("/views")) {
        return res.redirect("/users/views/login");
      }
      return next(error);
    }

    if (!allowedRoles.includes(req.user.profile)) {
      const error = new AppError(
        "No tienes permisos suficientes para realizar esta acción",
        403,
      );
      if (req.originalUrl.includes("/views")) {
        res.locals.error = error.message;
        return res.status(403).render("error", {
          status: 403,
          message: error.message,
          source: "Autorización",
        });
      }
      return next(error);
    }

    next();
  };
};
