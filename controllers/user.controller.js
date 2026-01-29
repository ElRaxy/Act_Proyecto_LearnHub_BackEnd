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

// Mostrar formulario de nuevo usuario (Registro)
exports.showNewUser = (req, res) => {
  res.locals.tituloEJS = 'Registro de Usuario'
  res.render('users/register', { baseUrlUsers })
}

// Mostrar formulario de login
exports.showLogin = (req, res) => {
  res.locals.tituloEJS = 'Iniciar Sesión'
  res.render('users/login', { baseUrlUsers })
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
// Ver usuario
exports.getById = wrapAsync(async (req, res, next) => {
  const user = await userService.getById(req.params.id)
  if (!user) return next(new AppError('Usuario no encontrado', 404))

  res.locals.tituloEJS = 'Detalle Usuario'
  res.render('users/show', { user, baseUrlUsers })
})

exports.registerUser = wrapAsync(async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body)
    // Auto-login after registration
    const { token } = await userService.login(req.body.email, req.body.password)

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 30 * 60 * 1000 // 30 minutos
    })

    res.redirect(baseUrlUsers)
  } catch (error) {
    const errors = {}

    // Handle duplicate key errors (unique constraint violations)
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0]
      if (field === 'email') errors.email = 'Este email ya está registrado'
      else if (field === 'dni') errors.dni = 'Este DNI ya está registrado'
      else if (field === 'phone') errors.phone = 'Este teléfono ya está registrado'
    }
    // Handle Mongoose validation errors
    else if (error.name === 'ValidationError') {
      Object.keys(error.errors).forEach(field => {
        const err = error.errors[field]
        if (err.kind === 'required') {
          errors[field] = 'Este campo es requerido'
        } else if (err.kind === 'minlength') {
          errors[field] = `Debe tener al menos ${err.properties.minlength} caracteres`
        } else if (err.kind === 'maxlength') {
          errors[field] = `No puede exceder ${err.properties.maxlength} caracteres`
        } else {
          errors[field] = err.message
        }
      })
    }

    res.render('users/register', {
      baseUrlUsers,
      errors,
      formData: req.body
    })
  }
})

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body
  try {
    const userLogued = await userService.login(email, password)
    if (userLogued) {
      res.cookie('token', userLogued.token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
        maxAge: 30 * 60 * 1000 // 30 minutos
      })
      res.redirect(baseUrlUsers)
    } else {
      res.render('users/login', {
        baseUrlUsers,
        error: 'Usuario y/o contraseña incorrecta',
        email // To keep email field filled
      })
    }
  } catch (error) {
    res.render('users/login', {
      baseUrlUsers,
      error: 'Error al intentar iniciar sesión',
      email
    })
  }
})

exports.logoutUser = wrapAsync(async (req, res, next) => {
  res.clearCookie('token')
  res.redirect('/users/rss/login')
})
