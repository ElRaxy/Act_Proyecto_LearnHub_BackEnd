const userService = require('../services/user.service')

// Listar todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.locals.tituloEJS = 'Listado de Usuarios'
    res.render('users/index', { users, baseUrlUsers: '/api/v1/users' })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// Mostrar formulario de nuevo usuario
exports.showNewUser = (req, res) => {
  res.locals.tituloEJS = 'Nuevo Usuario'
  res.render('users/new', { baseUrlUsers: '/api/v1/users' })
}

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    await userService.create(req.body)
    res.redirect('/api/v1/users')
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

// Mostrar formulario de edición
exports.showEditUser = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.locals.tituloEJS = 'Editar Usuario'
    res.render('users/edit', { user, baseUrlUsers: '/api/v1/users' })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario para edición' })
  }
}

// Actualizar usuario
exports.editUser = async (req, res) => {
  try {
    const updatedUser = await userService.update(req.params.id, req.body)
    if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.redirect('/api/v1/users')
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar usuario' })
  }
}

// Borrar usuario
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.delete(req.params.id)
    if (!deletedUser) return res.status(404).json({ error: 'Usuario no encontrado' })

    res.redirect('/api/v1/users')
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
    res.render('users/show', { user, baseUrlUsers: '/api/v1/users' })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}
