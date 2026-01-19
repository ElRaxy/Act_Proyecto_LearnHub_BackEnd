const User = require('../models/user.model')
const bcrypt = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')

// Traer todos los usuarios
exports.getAllUsers = async () => await User.find().lean()

// Traer usuario por ID
exports.getById = async id => await User.findById(id).lean()

// Crear usuario
exports.create = async data => {
  const newUser = new User(data)
  return await newUser.save()
}

// Actualizar usuario
exports.update = async (id, data) =>
  await User.findByIdAndUpdate(id, data, { new: true })

// Eliminar usuario
exports.delete = async id => await User.findByIdAndDelete(id)

//Login
exports.login = async (emailParam, passwordParam) => {
  let userFound = null
  userFound = await User.findOne({ email: emailParam }).select('+password') //Excepcion para devolver password sin seleccionarlo
  if (userFound) {
    const validado = await bcrypt.compareLogin(
      passwordParam,
      userFound.password
    )
    if (validado) {
      //JWT: Crear un token
      const token = jwt.sign(
        {
          //.Payload
          id: userFound._id,
          email: userFound.email,
          profile: userFound.profile,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h', //.Token expirado en 1 hora
        }
      )
      const user = userFound.toObject()
      delete user.password
      return { user, token }
      //JWT: Devolver el token
    } else {
      return null
    }
  } else {
    return null
  }
}
