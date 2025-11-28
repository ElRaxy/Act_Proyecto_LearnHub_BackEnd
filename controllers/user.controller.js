const userService = require('../services/user.service')

// Listar todos
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.render('users/index', { users })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

// Formulario nuevo
exports.showNewUser = async (req, res) => {
  res.locals.tituloEJS = 'Nuevo Usuario'
  res.render('users/new')
}

// Crear usuario
exports.createUser = async (req, res) => {
  try {
    const user = await userService.create(req.body)
    res.redirect('/users')
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

// Mostrar formulario de edición
exports.showEditUser = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    if (user) {
      res.locals.tituloEJS = 'Editar Usuario'
      res.render('users/edit', { user })
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

// Actualizar usuario
exports.editUser = async (req, res) => {
  try {
    const userUpdated = await userService.update(req.params.id, req.body)
    if (userUpdated) res.redirect('/users')
    else res.status(404).json({ error: 'Usuario no encontrado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al editar usuario' })
  }
}

// Eliminar usuario
exports.deleteUser = async (req, res) => {
  try {
    const userDeleted = await userService.delete(req.params.id)
    if (userDeleted) res.redirect('/users')
    else res.status(404).json({ error: 'Usuario no encontrado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

// Buscar por DNI
exports.findByDni = async (req, res) => {
  try {
    const user = await User.findOne({ dni: req.params.dni })
    if (user) res.status(200).json(user)
    else res.status(404).json({ error: 'Usuario no encontrado' })
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar por DNI' })
  }
}
