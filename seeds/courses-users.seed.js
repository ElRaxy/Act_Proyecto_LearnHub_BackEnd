require('dotenv').config()
const mongoose = require('mongoose')
const coursesModel = require('../models/courses.model')
const userModel = require('../models/user.model')

// conectar MongoDB (sin opciones deprecated)
const conectarMongoDB = async () => {
  return mongoose.connect(process.env.MONGODB_CONSTRING)
}

const ejecutar = async () => {
  await conectarMongoDB()

  // Borrar colecciones antes de insertar
  await userModel.deleteMany({})
  await coursesModel.deleteMany({})

  const courses = [
    {
      title: 'Curso de Desarrollo FrontEnd',
      description: 'Curso de Desarrollo FrontEnd',
      category: 'Desarrollo FrontEnd',
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      location: 'Madrid',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    },
    {
      title: 'Curso de Desarrollo BackEnd',
      description: 'Curso de Desarrollo BackEnd',
      category: 'Desarrollo BackEnd',
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      location: 'Madrid',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    },
    {
      title: 'Curso de AI y Machine Learning',
      description: 'Curso de AI y Machine Learning',
      category: 'AI y Machine Learning',
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      location: 'Madrid',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
    },
  ]

  const users = [
    {
      dni: '12345678d',
      firstName: 'Alex',
      lastName: 'Micro',
      email: 'alexmicro@gmail.com',
      phone: '+34666666601',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'ADMINISTRADOR',
      password: 'password123',
    },
    {
      dni: '12345678e',
      firstName: 'Alejandro',
      lastName: 'Puente',
      email: 'alejandropuente@gmail.com',
      phone: '+34666666602',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'ALUMNO',
      password: 'password123',
    },
    {
      dni: '12345678f',
      firstName: 'Carlos',
      lastName: 'Perez',
      email: 'carlosperez@gmail.com',
      phone: '+34666666603',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'PROFESOR',
      password: 'password123',
    },
    {
      dni: '12345678g',
      firstName: 'David',
      lastName: 'Rodriguez',
      email: 'davidrodriguez@gmail.com',
      phone: '+34666666604',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'ALUMNO',
      password: 'password123',
    },
    {
      dni: '12345678h',
      firstName: 'Eduardo',
      lastName: 'Rodriguez',
      email: 'eduardorodriguez@gmail.com',
      phone: '+34666666605',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'PROFESOR',
      password: 'password123',
    },
    {
      dni: '12345678i',
      firstName: 'Fernando',
      lastName: 'Perez',
      email: 'fernandoperez@gmail.com',
      phone: '+34666666606',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'ALUMNO',
      password: 'password123',
    },
    {
      dni: '12345678j',
      firstName: 'Gabriel',
      lastName: 'Rodriguez',
      email: 'gabrielrodriguez@gmail.com',
      phone: '+34666666607',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'PROFESOR',
      password: 'password123',
    },
    {
      dni: '12345678k',
      firstName: 'Hugo',
      lastName: 'Rodriguez',
      email: 'hugorodriguez@gmail.com',
      phone: '+34666666608',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'ALUMNO',
      password: 'password123',
    },
    {
      dni: '12345678l',
      firstName: 'Isabel',
      lastName: 'Rodriguez',
      email: 'isabelrodriguez@gmail.com',
      phone: '+34666666609',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'PROFESOR',
      password: 'password123',
    },
    {
      dni: '12345678m',
      firstName: 'Juan',
      lastName: 'Perez',
      email: 'juanperez@gmail.com',
      phone: '+34666666610',
      birthDate: new Date('1990-01-01'),
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01'),
      profile: 'ALUMNO',
      password: 'password123',
    },
  ]

  try {
    await userModel.insertMany(users)
    console.log('Usuarios insertados con éxito')
  } catch (err) {
    console.log(`Error al insertar usuarios. Desc: ${err}`)
  }

  try {
    await coursesModel.insertMany(courses)
    console.log('Cursos insertados con éxito')
  } catch (err) {
    console.log(`Error al insertar cursos. Desc: ${err}`)
  } finally {
    process.exit(0)
  }
}

ejecutar()
