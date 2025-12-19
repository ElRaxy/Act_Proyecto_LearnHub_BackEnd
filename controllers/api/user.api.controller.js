const userService = require('../../services/user.service')

// Listar todos los usuarios
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo usuarios: ' + error.message })
  }
}

// Mostrar formulario de nuevo usuario
exports.showNewUser = (req, res) => {
  res.render('users/new', { baseUrlUsers: '/api/v1/users' })
}

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.create(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: 'Error creando usuario: ' + error.message })
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
    // Verificar que el usuario existe antes de actualizar
    const existingUser = await userService.getById(req.params.id)
    if (!existingUser) {
      return res.status(404).json({ error: `Usuario con ID '${req.params.id}' no encontrado` })
    }

    const updatedUser = await userService.update(req.params.id, req.body)
    if (!updatedUser) {
      return res.status(500).json({ error: 'Error al actualizar el usuario' })
    }
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando usuario: ' + error.message })
  }
}

// Borrar usuario
exports.deleteUser = async (req, res) => {
  try {
    // Verificar que el usuario existe antes de eliminar
    const existingUser = await userService.getById(req.params.id)
    if (!existingUser) {
      return res.status(404).json({ error: `Usuario con ID '${req.params.id}' no encontrado` })
    }

    const deletedUser = await userService.delete(req.params.id)
    if (!deletedUser) {
      return res.status(500).json({ error: 'Error al eliminar el usuario' })
    }
    res.status(200).json({ message: 'Usuario eliminado exitosamente', user: deletedUser })
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando usuario: ' + error.message })
  }
}

// Ver usuario
exports.getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: `Usuario con ID '${req.params.id}' no encontrado` })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo usuario: ' + error.message })
  }
}
