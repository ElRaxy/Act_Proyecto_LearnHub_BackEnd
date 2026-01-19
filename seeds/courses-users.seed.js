require('dotenv').config()
const mongoose = require('mongoose')
const coursesModel = require('../models/courses.model')
const userModel = require('../models/user.model')

const conectarMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CONSTRING)
    console.log('Conectado con MongoDB!!!')
  } catch (err) {
    console.log(`Error al conectar con MongoDB: ${err}`)
    process.exit(1)
  }
}

const ejecutar = async () => {
  await conectarMongoDB()

  // Borrar colecciones antes de insertar
  await userModel.deleteMany({})
  await coursesModel.deleteMany({})

  const courses = [
    { title: 'Curso de Desarrollo FrontEnd', description: 'Curso de Desarrollo FrontEnd', category: 'Desarrollo FrontEnd', startDate: new Date('2021-04-01'), endDate: new Date('2021-04-30'), location: 'Madrid' },
    { title: 'Curso de Desarrollo BackEnd', description: 'Curso de Desarrollo BackEnd', category: 'Desarrollo BackEnd', startDate: new Date('2021-04-01'), endDate: new Date('2021-04-30'), location: 'Madrid' },
    { title: 'Curso de AI y Machine Learning', description: 'Curso de AI y Machine Learning', category: 'AI y Machine Learning', startDate: new Date('2021-04-01'), endDate: new Date('2021-04-30'), location: 'Madrid' }
  ]

  const users = [
    { dni: '12345678d', firstName: 'Alex', lastName: 'Micro', email: 'alexmicro@gmail.com', phone: '+34666666601', birthDate: new Date('1990-01-01'), profile: 'ADMINISTRADOR' },
    { dni: '12345678e', firstName: 'Alejandro', lastName: 'Puente', email: 'alejandropuente@gmail.com', phone: '+34666666602', birthDate: new Date('1990-01-01'), profile: 'ALUMNO' },
    { dni: '12345678f', firstName: 'Carlos', lastName: 'Perez', email: 'carlosperez@gmail.com', phone: '+34666666603', birthDate: new Date('1990-01-01'), profile: 'PROFESOR' }
    // agrega el resto si quieres
  ]

  try {
    await userModel.insertMany(users)
    console.log('Usuarios insertados con éxito')
  } catch (err) {
    console.log(`Error al insertar usuarios: ${err}`)
  }

  try {
    await coursesModel.insertMany(courses)
    console.log('Cursos insertados con éxito')
  } catch (err) {
    console.log(`Error al insertar cursos: ${err}`)
  } finally {
    mongoose.connection.close()
    process.exit(0)
  }
}

ejecutar()
