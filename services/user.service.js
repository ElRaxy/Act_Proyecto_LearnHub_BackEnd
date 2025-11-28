const User = require('../models/user.model')

// Traer todos los usuarios
exports.getAllUsers = async () => await User.find()

// Traer usuario por ID
exports.getById = async (id) => await User.findById(id)

// Crear usuario
exports.create = async (data) => {
  const newUser = new User(data)
  return await newUser.save()
}

// Actualizar usuario
exports.update = async (id, data) => await User.findByIdAndUpdate(id, data, { new: true })

// Eliminar usuario
exports.delete = async (id) => await User.findByIdAndDelete(id)
