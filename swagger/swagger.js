require('dotenv').config()
const swaggerJSDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LearnHub API',
      version: '1.0.0',
      description: 'API para el LearnHub, plataforma de aprendizaje en línea',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || process.env.PUERTO}`,
        description: 'Local server'
      }
    ],
    tags: [
      {
        name: 'Courses',
        description: 'Courses'
      },
      {
        name: 'Enrollments',
        description: 'Enrollments'
      },
      {
        name: 'Users',
        description: 'Users'
      }
    ],
    },
    apis: ['./routes/*.js']
  }

module.exports = swaggerJSDoc(options)
