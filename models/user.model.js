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

// Usa exactamente la colección "users"
module.exports = mongoose.models.User || mongoose.model('User', usersSchema, 'users')
