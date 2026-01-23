// REQUIRES / IMPORTS
require('dotenv').config()
const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger.js')
const fs = require('fs')
const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

// Importar Logger y ErrorHandler
const logger = require('./utils/logger')

// Códigos ANSI para colores en consola
const COLORS = {
  reset: '\x1b[0m',
  fgBrightBlue: '\x1b[94m',
  fgBrightGreen: '\x1b[92m',
  fgBrightRed: '\x1b[91m',
}

const colorBannerLine = line => `${COLORS.fgBrightBlue}${line}${COLORS.reset}`
const colorSuccess = text => `${COLORS.fgBrightGreen}${text}${COLORS.reset}`
const colorError = text => `${COLORS.fgBrightRed}${text}${COLORS.reset}`

const port = process.env.PORT || process.env.PUERTO

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

// CONFIGURACIÓN - MONGODB
const mongodbConfig = require('./utils/mongodb.config')

// SETUP - MIDDLEWARES BÁSICOS
app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

// --- 1. CONECTAR LOGGER DE ACCESO (Registra todas las peticiones) ---
app.use(logger.express)

// MIDDLEWARE para configurar VARIABLES GLOBALES en vistas EJS
app.use((req, res, next) => {
  res.locals.tituloEJS = 'LearnHub'
  res.locals.user = null

  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET)
      res.locals.user = decoded
    } catch (error) {
      // Token inválido, se queda como null
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

// DEFINIR RUTAS
app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (err, data) => {
    res.send(data)
  })
})

// API Routes
app.use(baseUrlAPIUsers, userApiRoutes)
app.use(baseUrlAPICourses, courseApiRoutes)
app.use(baseUrlAPIEnrollments, enrollmentApiRoutes)

// Vistas RSS
app.use(baseUrlUsersRSS, userRssRoutes)
app.use(baseUrlCoursesRSS, courseRssRoutes)
app.use(baseUrlEnrollmentsRSS, enrollmentRssRoutes)

// Rutas 404
app.get(/.*/, (req, res) => {
  res.status(404).json('Ruta no encontrada')
})

// --- 2. MIDDLEWARE GLOBAL DE ERRORES (Al final de todo) ---

app.use((err, req, res, next) => {
  // LOGUEO DEL ERROR (Terminal y Archivo)
  logger.error.error(
    `❌ ERROR: ${err.message} | URL: ${req.originalUrl} | Method: ${req.method}`
  )

  if (err.stack && process.env.NODE_ENV !== 'production') {
    console.error(err.stack) // Muestra el rastro del error en la terminal para desarrollo
  }

  const status = err.status || 500

  // Si la petición es de la API, respondemos JSON
  if (req.originalUrl.startsWith('/api')) {
    return res.status(status).json({
      status: 'error',
      message: err.message || 'Fallo interno en la API',
      source: err.source || 'API Server',
    })
  }

  // Para rutas RSS/Vistas, renderizamos la página de error
  res.status(status).render('error', {
    status,
    message: err.message || 'Algo ha fallado en el sistema',
    source: err.source || 'Sistema de Vistas',
  })
})

// LEVANTAR EL SERVER
app.listen(port, async () => {
  const topLine = '┌─────────────────────────────────────────────────────┐'
  const innerWidth = topLine.length - 2
  const title = 'LearnHub'
  const titlePadding = Math.floor((innerWidth - title.length) / 2)
  const titleRightPadding = innerWidth - titlePadding - title.length

  const banner = [
    topLine,
    `│${' '.repeat(titlePadding)}${title}${' '.repeat(titleRightPadding)}│`,
    `│${'─'.repeat(innerWidth)}│`,
    `│  Servidor: http://localhost:${port}${' '.repeat(innerWidth - `  Servidor: http://localhost:${port}`.length)}│`,
    `│  Swagger : http://localhost:${port}${process.env.SWAGGER_DOCS || '/api-docs'}${' '.repeat(innerWidth - `  Swagger : http://localhost:${port}${process.env.SWAGGER_DOCS || '/api-docs'}`.length)}│`,
    '└─────────────────────────────────────────────────────┘',
  ]
  console.log('\n' + banner.map(colorBannerLine).join('\n'))
  console.log(
    `\n${colorSuccess('✓')} ${colorSuccess('Servidor iniciado correctamente')}`
  )

  try {
    await mongodbConfig.conectarMongoDB()
    console.log(`${colorSuccess('✓')} ${colorSuccess('Conectado con MongoDB')}`)
  } catch (error) {
    console.log(
      `${colorError('✗')} ${colorError(`Error al conectar con MongoDB: ${error}`)}`
    )
    process.exit(0)
  }
})

// Limpiar consola periódicamente
setInterval(() => {
  console.clear()
  const now = new Date().toLocaleTimeString()
  console.log(
    `\n${colorBannerLine('╔═══════════════════════════════════════════════════╗')}`
  )
  console.log(
    `${colorBannerLine(`║                Consola Actualizada                ║`)}`
  )
  console.log(
    `${colorBannerLine(`║  Hora: ${now}                                   ║`)}`
  )
  console.log(
    `${colorBannerLine('╚═══════════════════════════════════════════════════╝')}\n`
  )
}, 50000)
