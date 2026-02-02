const userService = require("../services/user.service");
const baseUrlUsers = "/users/views";
const { wrapAsync } = require("../utils/functions");
const AppError = require("../utils/AppError");

// Listar todos los usuarios
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.locals.tituloEJS = "Listado de Usuarios";
    res.render("users/index", {
      users,
      baseUrlUsers,
    });
  } catch (error) {
    next(new AppError("Error al obtener usuarios", 500));
  }
};

// Mostrar formulario de nuevo usuario (Registro)
exports.showNewUser = (req, res) => {
  res.locals.tituloEJS = "Registro de Usuario";
  res.render("users/register", { baseUrlUsers });
};

// Mostrar formulario de login
exports.showLogin = (req, res) => {
  if (res.locals.currentUser) {
    return res.redirect("/");
  }
  res.locals.tituloEJS = "Iniciar Sesión";
  res.render("users/login", { baseUrlUsers });
};

// Crear usuario
exports.createUser = async (req, res, next) => {
  try {
    await userService.create(req.body);
    res.redirect(baseUrlUsers);
  } catch (error) {
    const errors = {};

    // Handle complexity error from service
    if (error.status === 400 && error.message.includes("contraseña")) {
      errors.password = error.message;
    }

    // Handle duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      if (field === "email") errors.email = "Este email ya está registrado";
      else if (field === "dni") errors.dni = "Este DNI ya está registrado";
      else if (field === "phone")
        errors.phone = "Este teléfono ya está registrado";
    }
    // Handle Mongoose validation errors
    else if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((field) => {
        errors[field] = error.errors[field].message;
      });
    }

    // If we have specific errors, re-render the form
    if (Object.keys(errors).length > 0) {
      return res.render("users/new", {
        baseUrlUsers,
        errors,
        formData: req.body,
      });
    }

    // Otherwise fall back to global error handler
    next(error);
  }
};
// Mostrar formulario de edición
exports.showEditUser = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.locals.tituloEJS = "Editar Usuario";
    res.render("users/edit", { user, baseUrlUsers });
  } catch (error) {
    next(new AppError("Error al obtener usuario para edición", 500));
  }
};

// Actualizar usuario
exports.editUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body);

    if (!updatedUser) {
      const err = new Error(`Usuario con ID '${req.params.id}' no encontrado`);
      err.status = 404;
      err.source = "Actualizar usuario";
      return next(err);
    }

    res.redirect(baseUrlUsers);
  } catch (error) {
    if (error.code === 11000) {
      error.status = 400;
      error.message = `El DNI '${req.body.dni}' ya está registrado`;
      error.source = "Actualizar usuario";
    } else {
      error.status = 500;
      error.source = "Actualizar usuario";
    }

    next(error);
  }
};

// Borrar usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.delete(req.params.id);
    if (!deletedUser)
      return res.status(404).json({ error: "Usuario no encontrado" });

    res.redirect(baseUrlUsers);
  } catch (error) {
    next(new AppError("Error al eliminar usuario", 500));
  }
};

// Ver usuario
// Ver usuario
exports.getById = wrapAsync(async (req, res, next) => {
  const user = await userService.getById(req.params.id);
  if (!user) return next(new AppError("Usuario no encontrado", 404));

  res.locals.tituloEJS = "Detalle Usuario";
  res.render("users/show", { user, baseUrlUsers });
});
exports.registerUser = wrapAsync(async (req, res, next) => {
  try {
    const newUserDoc = await userService.create(req.body);

    // Auto-login after registration
    const loginData = await userService.login(
      req.body.email,
      req.body.password,
    );

    if (loginData) {
      const { token, user } = loginData;

      // Asegurar que guardamos en cookie Y sesión
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 30 * 60 * 1000,
      });

      req.session.token = token;
      req.session.user = user;

      // Importante: Guardar explícitamente la sesión antes del redirect si es necesario
      // aunque express-session suele hacerlo al final de la petición
    }

    return res.redirect(baseUrlUsers);
  } catch (error) {
    const errors = {};

    // Handle complexity error from service
    if (error.status === 400 && error.message.includes("contraseña")) {
      errors.password = error.message;
    }

    // Handle duplicate key errors (unique constraint violations)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      if (field === "email") errors.email = "Este email ya está registrado";
      else if (field === "dni") errors.dni = "Este DNI ya está registrado";
      else if (field === "phone")
        errors.phone = "Este teléfono ya está registrado";
    }
    // Handle Mongoose validation errors
    else if (error.name === "ValidationError") {
      Object.keys(error.errors).forEach((field) => {
        const err = error.errors[field];
        if (err.kind === "required") {
          errors[field] = "Este campo es requerido";
        } else if (err.kind === "minlength") {
          errors[field] =
            `Debe tener al menos ${err.properties.minlength} caracteres`;
        } else if (err.kind === "maxlength") {
          errors[field] =
            `No puede exceder ${err.properties.maxlength} caracteres`;
        } else {
          errors[field] = err.message;
        }
      });
    }

    // Provide a fallback generic error if none was caught
    if (Object.keys(errors).length === 0) {
      errors.general = error.message || "Error al registrar usuario";
    }

    res.render("users/register", {
      baseUrlUsers,
      errors,
      formData: req.body,
    });
  }
});

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userLogued = await userService.login(email, password);
    if (userLogued) {
      // Guardar token en cookie para persistencia
      res.cookie("token", userLogued.token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 30 * 60 * 1000, // 30 minutos
      });
      // Guardar en sesión para cumplir requerimiento de express-session
      req.session.token = userLogued.token;
      req.session.user = userLogued.user;

      res.redirect(baseUrlUsers);
    } else {
      res.render("users/login", {
        baseUrlUsers,
        error: "Usuario y/o contraseña incorrecta",
        email, // To keep email field filled
      });
    }
  } catch (error) {
    res.render("users/login", {
      baseUrlUsers,
      error: "Error al intentar iniciar sesión",
      email,
    });
  }
});

exports.logoutUser = wrapAsync(async (req, res, next) => {
  res.clearCookie("token");
  req.session.destroy();
  res.redirect("/users/views/login");
});
