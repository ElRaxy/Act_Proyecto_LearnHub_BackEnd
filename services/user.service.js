const User = require('../models/users.model')

exports.getAllUsers = async () => await User.find()

exports.getById = async (id) => await User.findById(id)

exports.create = async (data) => {
  const newUser = new User(data)
  return await newUser.save()
}

exports.update = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true })
}

exports.delete = async (id) => {
  return await User.findByIdAndDelete(id)
}
