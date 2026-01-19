const userService = require('../services/user.service')
const baseUrlUsers = '/users/rss'
const { wrapAsync } = require('../utils/functions')
const AppError = require('../utils/AppError')

// Listar todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.locals.tituloEJS = 'Listado de Usuarios'
    res.render('users/index', { users, baseUrlUsers })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// Mostrar formulario de nuevo usuario
exports.showNewUser = (req, res) => {
  res.locals.tituloEJS = 'Nuevo Usuario'
  res.render('users/new', { baseUrlUsers })
}

// Crear usuario
exports.createUser = async (req, res, next) => {
  try {
    await userService.create(req.body)
    res.redirect(baseUrlUsers)
  } catch (error) {
    if (error.code === 11000) {
      error.status = 400
      error.message = `El DNI '${req.body.dni}' ya está registrado`
      error.source = 'Crear usuario'
    }

    next(error)
  }
}
// Mostrar formulario de edición
exports.showEditUser = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.locals.tituloEJS = 'Editar Usuario'
    res.render('users/edit', { user, baseUrlUsers })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario para edición' })
  }
}

// Actualizar usuario
exports.editUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body)

    if (!updatedUser) {
      const err = new Error(`Usuario con ID '${req.params.id}' no encontrado`)
      err.status = 404
      err.source = 'Actualizar usuario'
      return next(err)
    }

    res.redirect(baseUrlUsers)
  } catch (error) {
    if (error.code === 11000) {
      error.status = 400
      error.message = `El DNI '${req.body.dni}' ya está registrado`
      error.source = 'Actualizar usuario'
    } else {
      error.status = 500
      error.source = 'Actualizar usuario'
    }

    next(error)
  }
}

// Borrar usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.delete(req.params.id)
    if (!deletedUser)
      return res.status(404).json({ error: 'Usuario no encontrado' })

    res.redirect(baseUrlUsers)
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

// Ver usuario
exports.getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.locals.tituloEJS = 'Detalle Usuario'
    res.render('users/show', { user, baseUrlUsers })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

// Registrar usuario
exports.registerUser = wrapAsync(async (req, res, next) => {
  const usuarioCreado = await userService.create(req.body)
  if (usuarioCreado) {
    res.status(200).json(usuarioCreado)
  } else {
    next(new AppError('Error al registrar el usuario', 400)) //BAD REQUEST
  }
})

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { username, password } = req.body
  const userLogued = await userService.login(username, password)
  if (userLogued) {
    res.cookie('token', userLogued.token, {
      sameSite: 'none',
      secure: false,
    })

    res.status(200).json(userLogued)
  } else {
    next(new AppError('Usuario y/o contraseña incorrecta', 401))
  }
})

exports.logoutUser = wrapAsync(async (req, res, next) => {
  res.clearCookie('token')
  res.status(200).json({ message: 'Se ha cerrado la sesión' })
})
