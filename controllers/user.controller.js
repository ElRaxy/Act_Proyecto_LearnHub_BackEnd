const userService = require('../services/user.service')

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' })
  }
}

exports.getById = async (req, res) => {
  try {
    const user = await userService.getById(req.params.id)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

exports.showNewUser = async (req, res) => {
    res.locals.tituloEJS = 'Nuevo Usuario'
    res.render('users/new')
}

exports.createUser = async (req, res) => {
  try {
    const user = await userService.create(req.body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json({ error: 'Error al crear usuario' })
  }
}

exports.showEditUser = async (req, res) => {
  try {
    const { id } = req.params
    const user = await userService.getById(id)
    if(user){
        res.locals.tituloEJS = 'Editar Usuario'
        res.render('users/edit')
    }
    else{
        res.status(404).json({ error: 'No encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}

exports.editUser = async (req, res) => {
  try {
    const { id } = req.params
    const userUpdated = await userService.update(id, req.body)
    if(userUpdated){
        res.redirect('/users')
    }
    else{
        res.status(404).json({ error: 'No encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al editar usuario' })
  }
}

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    const userDeleted = await userService.delete(id)
    if(userDeleted){
        res.redirect('/users')
    }
    else{
        res.status(404).json({ error: 'No encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar usuario' })
  }
}

exports.findByDni = async (req, res) => {
  try {
    const { dni } = req.params
    const user = await userService.getById(dni)
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404).json({ error: 'No encontrado' })
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' })
  }
}