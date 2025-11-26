//  MongoDB --> Modelo “users”, que almacenará la información
// sobre usuarios matriculados (alumnos, profesores,
// administradores...) siguiente (podéis adaptarla a las
// necesidades... prácticamente todos los campos son
// obligatorios):

// • _id: ObjectId,
// • dni: String, // único
// • firstName: String,
// • lastName: String,
// • email: String,
// • phone: String,
// • birthDate: Date,
// • createdAt: Date,
// • updatedAt: Date
// • profile //rol o perfil de usuario, siendo ADMINISTRADOR,
// PROFESOR o ALUMNO

const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 9,
    maxlength: 9,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  profile: {
    type: String,
    required: true,
    enum: ['ADMINISTRADOR', 'PROFESOR', 'ALUMNO'],
  },
})

const usersModel = mongoose.model('                             ', usersSchema)

module.exports = usersModel
