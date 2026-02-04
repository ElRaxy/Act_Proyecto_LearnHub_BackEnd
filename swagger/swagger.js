require('dotenv').config()
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LearnHub API',
      version: '1.0.0',
      description: 'API para el LearnHub, plataforma de aprendizaje en línea',
      contact: {
        name: 'LearnHub Support',
        email: 'alemicrob@alu.edu.gva.es',
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || process.env.PUERTO}/api/{version}`,
        description: 'Servidor local de desarrollo',
        variables: {
          version: {
            default: process.env.API_VERSION || 'v1',
            description: 'Versión de la API',
          },
        },
      },
    ],
    tags: [
      {
        name: 'Courses',
        description: 'Operaciones relacionadas con cursos',
      },
      {
        name: 'Enrollments',
        description: 'Operaciones relacionadas con inscripciones',
      },
      {
        name: 'Users',
        description: 'Operaciones relacionadas con usuarios',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Ingresa el token JWT para acceder a los endpoints protegidos',
        },
      },
      schemas: {
        Course: {
          type: 'object',
          required: [
            'title',
            'description',
            'category',
            'startDate',
            'endDate',
            'location',
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del curso',
              example: '507f1f77bcf86cd799439011',
            },
            title: {
              type: 'string',
              description: 'Título del curso',
              example: 'Introducción a JavaScript',
            },
            description: {
              type: 'string',
              description: 'Descripción del curso',
              example: 'Curso completo de JavaScript desde cero',
            },
            category: {
              type: 'string',
              description: 'Categoría del curso',
              example: 'Programación',
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de inicio del curso',
              example: '2024-01-15T09:00:00.000Z',
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de fin del curso',
              example: '2024-03-15T18:00:00.000Z',
            },
            location: {
              type: 'string',
              description: 'Ubicación del curso',
              example: 'Aula 101',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        User: {
          type: 'object',
          required: [
            'dni',
            'firstName',
            'lastName',
            'email',
            'phone',
            'birthDate',
            'profile',
          ],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único del usuario',
              example: '507f1f77bcf86cd799439011',
            },
            dni: {
              type: 'string',
              description: 'DNI del usuario (9 caracteres)',
              example: '12345678a',
              minLength: 9,
              maxLength: 9,
            },
            firstName: {
              type: 'string',
              description: 'Nombre del usuario',
              example: 'Juan',
            },
            lastName: {
              type: 'string',
              description: 'Apellido del usuario',
              example: 'Pérez',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email del usuario',
              example: 'juan.perez@example.com',
            },
            phone: {
              type: 'string',
              description: 'Teléfono del usuario',
              example: '612345678',
            },
            birthDate: {
              type: 'string',
              format: 'date',
              description: 'Fecha de nacimiento',
              example: '1990-05-15',
            },
            profile: {
              type: 'string',
              enum: ['ADMINISTRADOR', 'PROFESOR', 'ALUMNO'],
              description:
                'Perfil del usuario (PROFESOR puede crear y editar, pero no borrar)',
              example: 'ALUMNO',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Enrollment: {
          type: 'object',
          required: ['userId', 'courseId', 'enrollmentsDate', 'status'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de la inscripción',
              example: '507f1f77bcf86cd799439011',
            },
            userId: {
              type: 'string',
              description: 'ID del usuario',
              example: '507f1f77bcf86cd799439011',
            },
            courseId: {
              type: 'string',
              description: 'ID del curso',
              example: '507f1f77bcf86cd799439012',
            },
            enrollmentsDate: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de inscripción',
              example: '2024-01-10T10:00:00.000Z',
            },
            status: {
              type: 'string',
              enum: ['pendiente', 'aprobado', 'rechazado'],
              description: 'Estado de la inscripción',
              example: 'pendiente',
            },
            notes: {
              type: 'string',
              description: 'Notas adicionales',
              example: 'Estudiante interesado en el curso',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error',
            },
            status: {
              type: 'number',
              description: 'Código de estado HTTP',
            },
            source: {
              type: 'string',
              description: 'Origen del error',
            },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, '../routes/*.js')],
}

module.exports = swaggerJSDoc(options)
