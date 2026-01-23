//REQUIRES / IMPORTS
require('dotenv').config()

const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger.js')
const fs = require('fs')

const logger = require('./utils/logger')

// Códigos ANSI para colores en consola
const COLORS = {
  reset: '\x1b[0m',
  fgWhite: '\x1b[37m',
  fgBrightWhite: '\x1b[97m',
  fgBlue: '\x1b[34m',
  fgBrightBlue: '\x1b[94m',
  fgGreen: '\x1b[32m',
  fgBrightGreen: '\x1b[92m',
  fgRed: '\x1b[31m',
  fgBrightRed: '\x1b[91m',
  fgCyan: '\x1b[36m',
  fgBrightCyan: '\x1b[96m',
}

const colorBannerLine = line => `${COLORS.fgBrightBlue}${line}${COLORS.reset}`
const colorSuccess = text => `${COLORS.fgBrightGreen}${text}${COLORS.reset}`
const colorError = text => `${COLORS.fgBrightRed}${text}${COLORS.reset}`

const port = process.env.PORT || process.env.PUERTO
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// ROUTES
const courseRssRoutes = require('./routes/course.routes')
const enrollmentRssRoutes = require('./routes/enrollment.routes')
const userRssRoutes = require('./routes/user.routes')

const courseApiRoutes = require('./routes/api/course.api.routes.js')
const enrollmentApiRoutes = require('./routes/api/enrollment.api.routes.js')
const userApiRoutes = require('./routes/api/user.api.routes.js')

// BASE URLS
const baseUrlAPICourses = `/api/${process.env.API_VERSION}/courses`
const baseUrlAPIEnrollments = `/api/${process.env.API_VERSION}/enrollments`
const baseUrlAPIUsers = `/api/${process.env.API_VERSION}/users`

const baseUrlUsersRSS = `/users/rss`
const baseUrlCoursesRSS = `/courses/rss`
const baseUrlEnrollmentsRSS = `/enrollments/rss`

//CONFIGURACIÓN - MONGODB
const mongodbConfig = require('./utils/mongodb.config')

//SETUP - MIDDLEWARES
app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({ extended: true }))
//Leer datos JSON en request body POST
app.use(express.json())
app.use(methodOverride('_method'))

const jwt = require('jsonwebtoken')
//MIDDLEWARE para configurar VARIABLES GLOBALES en vistas EJS
app.use((req, res, next) => {
  res.locals.tituloEJS = 'LearnHub'
  res.locals.user = null

  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
      res.locals.user = decoded
    } catch (error) {
      // Ignorar error de token
    }
  }
  next()
})

// Configuración de Swagger
app.use(
  process.env.SWAGGER_DOCS || '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec)
)

//DEFINIR RUTAS
//Raíz

app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (err, data) => {
    res.send(data)
  })
})

// API
app.use(baseUrlAPIUsers, userApiRoutes) // devuelven JSON
app.use(baseUrlAPICourses, courseApiRoutes)
app.use(baseUrlAPIEnrollments, enrollmentApiRoutes)

// VISTAS
app.use(baseUrlUsersRSS, userRssRoutes) // renderiza Vistas EJS
app.use(baseUrlCoursesRSS, courseRssRoutes)
app.use(baseUrlEnrollmentsRSS, enrollmentRssRoutes)

//Rutas por defecto
//Si no se especifica ninguna ruta, redirigir a el index.html
app.get(/.*/, (req, res) => {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'))
  res.status(404).json('Ruta no encontrada')
})

// Middleware global de errores
app.use((err, req, res, next) => {
  const status = err.status || 500

  res.status(status).render('error', {
    status,
    message: err.message || 'Fallo interno',
    source: err.source || 'Sistema',
  })
})

//LEVANTAR EL SERVER
app.listen(port, async () => {
  // Banner inicial con título y URLs del servidor y Swagger
  const topLine = '┌─────────────────────────────────────────────────────┐'
  const innerWidth = topLine.length - 2 // ancho sin las barras verticales
  const title = 'LearnHub'
  const titlePadding = Math.floor((innerWidth - title.length) / 2)
  const titleRightPadding = innerWidth - titlePadding - title.length

  const banner = [
    topLine,
    `│${' '.repeat(titlePadding)}${title}${' '.repeat(titleRightPadding)}│`,
    `│${'─'.repeat(innerWidth)}│`,
    `│  Servidor: http://localhost:${port}${' '.repeat(innerWidth - 0 - `  Servidor: http://localhost:${port}`.length)}│`,
    `│  Swagger : http://localhost:${port}${process.env.SWAGGER_DOCS}${' '.repeat(innerWidth - 0 - `  Swagger : http://localhost:${port}${process.env.SWAGGER_DOCS}`.length)}│`,
    '└─────────────────────────────────────────────────────┘',
  ]
  console.log('\n' + banner.map(colorBannerLine).join('\n'))
  console.log(`\n${colorSuccess('✓')} ${colorSuccess('Servidor iniciado correctamente')}`)
  logger.acceso.info('Servidor iniciado correctamente')

  try {
    // Conexión a MongoDB
    await mongodbConfig
      .conectarMongoDB()
      .then(() => {
        console.log(
          `${colorSuccess('✓')} ${colorSuccess('Conectado con MongoDB')}`
        )
      })
      .catch(err => {
        console.log(
          `${colorError('✗')} ${colorError(`Error al conectar con MongoDB: ${err}`)}`
        )
        process.exit(0) // Cerrar servidor si no hay conexión a BD
      })
  } catch (error) {
    console.log(
      `${colorError('✗')} ${colorError(`Error al conectar con MongoDB: ${error}`)}`
    )
    process.exit(0)
  }
})

// Limpiar consola cada 50 segundos y mostrar URLs principales
setInterval(() => {
  console.clear()
  const now = new Date().toLocaleTimeString()
  const infoTop = '╔═══════════════════════════════════════════════════╗'
  const infoWidth = infoTop.length - 2
  const title = 'Consola Actualizada'
  const titlePadding = Math.floor((infoWidth - title.length) / 2)
  const titleRightPadding = infoWidth - titlePadding - title.length

  const horaText = `  Hora: ${now}`
  const servidorText = `  Servidor: http://localhost:${port}`
  const swaggerText = `  Swagger : http://localhost:${port}${process.env.SWAGGER_DOCS}`

  const info = [
    infoTop,
    `║${' '.repeat(titlePadding)}${title}${' '.repeat(titleRightPadding)}║`,
    `║${'─'.repeat(infoWidth)}║`,
    `║${horaText}${' '.repeat(infoWidth - horaText.length)}║`,
    `║${servidorText}${' '.repeat(infoWidth - servidorText.length)}║`,
    `║${swaggerText}${' '.repeat(infoWidth - swaggerText.length)}║`,
    '╚═══════════════════════════════════════════════════╝',
  ]
  console.log('\n' + info.map(colorBannerLine).join('\n') + '\n')
}, 50000)
