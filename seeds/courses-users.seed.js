const mongodbConfig = require('../utils/mongodb.config')
const coursesModel = require('../models/courses.model')
const usersModel = require('../models/users.model')

const ejecutar = async () => {
  try {
    await mongodbConfig
      .conectarMongoDB()
      .then(() => {
        console.log('Conectado con MongoDB!!!')
      })
      .catch(err => {
        //Si no conectamos con MongoDB, debemos tumbar el server
        console.log(`Error al conectar con MongoDB. Desc: ${err}`)
        //Tumbar el server
        process.exit(0)
      })
  } catch (error) {
    console.log(`Error al conectar con MongoDB. Desc: ${error}`)
    //Tumbar el server
    process.exit(0)
  }

  const courses = [
    {
      title: 'Curso de Desarrollo FrontEnd',
      description: 'Curso de Desarrollo FrontEnd',
      category: 'Desarrollo FrontEnd',
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      location: 'Madrid',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01')
    },
    {
      title: 'Curso de Desarrollo BackEnd',
      description: 'Curso de Desarrollo BackEnd',
      category: 'Desarrollo BackEnd',
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      location: 'Madrid',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01')
    },
    {
      title: 'Curso de AI y Machine Learning',
      description: 'Curso de AI y Machine Learning',
      category: 'AI y Machine Learning',
      startDate: new Date('2021-04-01'),
      endDate: new Date('2021-04-30'),
      location: 'Madrid',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01')
    }
  ]

  const users = [
    {
      name: 'Alex',
      email: 'alex@gmail.com',
      password: '123456',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01')
    },
    {
      name: 'Alejandro',
      email: 'alejandro@gmail.com',
      password: '123456',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01')
    },
    {
      name: 'Juan',
      email: 'juan@gmail.com',
      password: '123456',
      createdAt: new Date('2021-01-01'),
      updatedAt: new Date('2021-01-01')
    }
  ]

  await usersModel.insertMany(users)
  .then(() => {
    console.log('Usuarios insertados con éxito')
  })
  .catch(err => {
    console.log(`Error al insertar usuarios. Desc: ${err}`)
  })
  .finally(() => {
    process.exit(0)
  })

  await coursesModel.insertMany(courses)
  .then(() => {
    console.log('Cursos insertados con éxito')
  })
  .catch(err => {
    console.log(`Error al insertar cursos. Desc: ${err}`)
  })
  .finally(() => {
    process.exit(0)
  })
}

ejecutar()
