require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')
const User = require('../models/user.model')
const Course = require('../models/courses.model')
const Enrollment = require('../models/enrollments.model')

const clearDB = async () => {
  try {
    console.log('--- Limpieza de Base de Datos ---')
    await mongoose.connect(process.env.MONGODB_CONSTRING)
    console.log('Conectado a MongoDB Atlas.')

    // Eliminar colecciones
    const userRes = await User.deleteMany({})
    console.log(`Usuarios eliminados: ${userRes.deletedCount}`)

    const courseRes = await Course.deleteMany({})
    console.log(`Cursos eliminados: ${courseRes.deletedCount}`)

    const enrollRes = await Enrollment.deleteMany({})
    console.log(`Matrículas eliminadas: ${enrollRes.deletedCount}`)

    console.log('Base de datos limpia con éxito.')
  } catch (err) {
    console.error('Error durante la limpieza:', err)
  } finally {
    mongoose.connection.close()
    process.exit(0)
  }
}

clearDB()
