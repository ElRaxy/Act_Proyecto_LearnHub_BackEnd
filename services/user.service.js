const usersModel = require('../models/users.model')

exports.getAllUsers = async() => await usersModel.find()

exports.getById = async(id) => await usersModel.findById(id)

exports.create = async (data) => {
    const newUser = new usersModel(data)
    return await newUser.save()
}

exports.update = async (id, data) => {
    return await usersModel.findByIdAndUpdate(id, data,{new:true})
}

exports.delete = async (id) => {
    return await usersModel.findByIdAndDelete(id)
}