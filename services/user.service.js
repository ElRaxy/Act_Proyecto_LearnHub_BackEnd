const User = require('../models/user.model')
const bcrypt = require('../utils/bcrypt')
const jwt = require('jsonwebtoken')
const { encryptPassword } = require('../utils/bcrypt')

const validatePassword = (password = '') => {
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /\d/.test(password) &&
    /[-_!@?]/.test(password)
  )
}

// Traer todos los usuarios
exports.getAllUsers = async () => await User.find().lean()

// Traer usuario por ID
exports.getById = async id => await User.findById(id).lean()

// Crear usuario
exports.create = async data => {
  const userData = { ...data }
  if (userData.password) {
    if (!validatePassword(userData.password)) {
      throw new Error('La contraseña no cumple los requisitos mínimos')
    }

    userData.password = await bcrypt.encryptPassword(userData.password)
  }
  const newUser = new User(userData)
  return await newUser.save()
}

// Actualizar usuario
exports.update = async (id, data) => {
  const userData = { ...data }
  if (userData.password) {
    userData.password = await bcrypt.encryptPassword(userData.password)
  }
  return await User.findByIdAndUpdate(id, userData, { new: true })
}

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
