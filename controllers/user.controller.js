const userService = require("../services/user.service");
const baseUrlUsers = "/users/rss";
const { wrapAsync } = require("../utils/functions");
const AppError = require("../utils/AppError");

// Listar todos los usuarios
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.locals.tituloEJS = "Listado de Usuarios";
    res.render("users/index", { users, baseUrlUsers });
  } catch (error) {
    next(new AppError("Error al obtener usuarios", 500));
  }
};

// Mostrar formulario de nuevo usuario (Admin)
exports.showNewUser = (req, res) => {
  res.locals.tituloEJS = "Nuevo Usuario";
  res.render("users/new", { baseUrlUsers });
};

// Mostrar formulario de registro (Público)
exports.showRegister = (req, res) => {
  res.locals.tituloEJS = "Registro";
  res.render("register", { baseUrlUsers });
};

// Crear usuario (con auto-login)
exports.createUser = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);

    // Auto-login: Intentamos loguear al usuario recién creado
    const loginData = await userService.login(
      req.body.email,
      req.body.password,
    );

    if (loginData) {
      res.cookie("token", loginData.token, {
        httpOnly: true,
        secure: false,
      });
    }

    res.redirect(baseUrlUsers);
  } catch (error) {
    if (error.code === 11000) {
      // Extraemos el nombre del campo que causa el conflicto
      const field = Object.keys(error.keyPattern)[0];
      error.status = 400;
      error.message = `El campo '${field}' ya está registrado con ese valor.`;
      error.source = "Registro de usuario";
    }

    next(error);
  }
};
// Mostrar formulario de edición
exports.showEditUser = async (req, res, next) => {
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
    // Si la contraseña viene vacía, la eliminamos para no sobreescribirla
    if (req.body.password === "") {
      delete req.body.password;
    }
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
exports.deleteUser = async (req, res, next) => {
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
exports.getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    res.locals.tituloEJS = "Detalle Usuario";
    res.render("users/show", { user, baseUrlUsers });
  } catch (error) {
    next(new AppError("Error al obtener usuario", 500));
  }
};

// Mostrar Formulario de Login
exports.showLogin = (req, res) => {
  res.locals.tituloEJS = "Login";
  res.render("login", { baseUrlUsers });
};

// Registrar usuario
exports.registerUser = wrapAsync(async (req, res, next) => {
  const usuarioCreado = await userService.create(req.body);
  if (usuarioCreado) {
    res.status(200).json(usuarioCreado);
  } else {
    next(new AppError("Error al registrar el usuario", 400)); //BAD REQUEST
  }
});

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const userLogued = await userService.login(email, password);
  if (userLogued) {
    res.cookie("token", userLogued.token, {
      httpOnly: true,
      secure: false,
    });

    // Si es una petición AJAX o espera JSON, responder JSON
    if (req.xhr || req.headers.accept.indexOf("json") > -1) {
      return res.status(200).json(userLogued);
    }

    // Si es un formulario tradicional de vista RSS, redirigir a usuarios
    res.redirect(baseUrlUsers);
  } else {
    const error = new AppError("Usuario y/o contraseña incorrecta", 401);
    error.source = "Login";
    next(error);
  }
});

exports.logoutUser = wrapAsync(async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/");
});
