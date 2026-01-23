const userService = require('../../services/user.service')
const { wrapAsync } = require('../../utils/functions')
const AppError = require('../../utils/AppError')

// Listar todos los usuarios
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers()
    res.locals.tituloEJS = 'Listado de Usuarios'
    res.status(200).json(users)
  } catch (error) {
    next(new AppError('Error al obtener usuarios', 500)) //BAD REQUEST
  }
}

// Mostrar formulario de nuevo usuario
exports.showNewUser = (req, res) => {
  res.render('users/new', { baseUrlUsers: '/api/v1/users' })
}

exports.createUser = async (req, res, next) => {
  try {
    const user = await userService.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    next(new AppError('Error al crear usuario', 500)) //BAD REQUEST
  }
}

// Mostrar formulario de edición
exports.showEditUser = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) next(new AppError('Usuario no encontrado', 404)) //BAD REQUEST

    res.locals.tituloEJS = 'Editar Usuario'
    res.render('users/edit', { user, baseUrlUsers: '/api/v1/users' })
  } catch (error) {
    next(new AppError('Error al obtener usuario para edición', 500)) //BAD REQUEST
  }
}

// Actualizar usuario
exports.editUser = async (req, res, next) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body)
    if (!updatedUser)
      return res.status(404).json({ error: 'Usuario no encontrado' })

    res.status(200).json(updatedUser)
  } catch (error) {
    next(new AppError('Error al actualizar usuario', 500)) //BAD REQUEST
  }
}

// Borrar usuario
exports.deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await userService.delete(req.params.id)
    if (!deletedUser)
      return res.status(404).json({ error: 'Usuario no encontrado' })

    res.status(200).json(deletedUser)
  } catch (error) {
    next(new AppError('Error al eliminar usuario', 500)) //BAD REQUEST
  }
}

// Ver usuario
exports.getById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.locals.tituloEJS = 'Detalle Usuario'
    res.status(200).json(user)
  } catch (error) {
    next(new AppError('Error al obtener usuario', 500)) //BAD REQUEST
  }
}

// Registrar usuario
exports.registerUser = wrapAsync(async (req, res, next) => {
  const usuarioCreado = await userService.create(req.body)
  if(usuarioCreado){
    const loginData = await userService.login(req.body.email, req.body.password)
    if(loginData && loginData.token){
      res.status(200).json({ user: usuarioCreado, token: loginData.token })
    } else {
      res.status(201).json(usuarioCreado)
    }
  } else {
    next(new AppError('Error al registrar el usuario', 400)) //BAD REQUEST
  }


  const usuarioLogeado = await userService.login(usuarioCreado.email, usuarioCreado.password)

  if (usuarioLogeado) {
    res.status(200).json(usuarioLogeado)
  } else {
    next(new AppError('Error al registrar el usuario', 400)) //BAD REQUEST
  }
})

exports.loginUser = wrapAsync(async (req, res, next) => {
  const { email, password } = req.body
  const userLogued = await userService.login(email, password)
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
