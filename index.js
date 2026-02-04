//REQUIRES / IMPORTS
require('dotenv').config()

const swaggerUI = require('swagger-ui-express')
const swaggerSpec = require('./swagger/swagger.js')
const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const { usingMorgan } = require('./middlewares/morgan.mw')
const { loadUser, verifyToken } = require('./middlewares/jwt.mw')
const { errorHandler } = require('./middlewares/errorHandler.mw')
const AppError = require('./utils/AppError')

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

const colorBannerLine = (line) => `${COLORS.fgBrightBlue}${line}${COLORS.reset}`;
const colorSuccess = (text) => `${COLORS.fgBrightGreen}${text}${COLORS.reset}`;
const colorError = (text) => `${COLORS.fgBrightRed}${text}${COLORS.reset}`;

const port = process.env.PORT || process.env.PUERTO
const app = express()

// ROUTES
const courseRssRoutes = require("./routes/course.routes");
const enrollmentRssRoutes = require("./routes/enrollment.routes");
const userRssRoutes = require("./routes/user.routes");

const courseApiRoutes = require("./routes/api/course.api.routes.js");
const enrollmentApiRoutes = require("./routes/api/enrollment.api.routes.js");
const userApiRoutes = require("./routes/api/user.api.routes.js");

// BASE URLS
const baseUrlAPICourses = `/api/${process.env.API_VERSION}/courses`;
const baseUrlAPIEnrollments = `/api/${process.env.API_VERSION}/enrollments`;
const baseUrlAPIUsers = `/api/${process.env.API_VERSION}/users`;

const baseUrlUsersRSS = `/users/views`
const baseUrlCoursesRSS = `/courses/views`
const baseUrlEnrollmentsRSS = `/enrollments/views`

//CONFIGURACIÓN - MONGODB
const mongodbConfig = require('./utils/mongodb.config')

//SETUP - MIDDLEWARES
app.use(cors())
app.use(cookieParser())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('json spaces', 2)
app.use(express.static(path.join(__dirname, 'public')))
//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({ extended: true }))
//Leer datos JSON en request body POST
app.use(express.json())
app.use(methodOverride('_method'))

// Configuración de Morgan (Logs de consola y archivo)
const morganMiddlewares = usingMorgan()
if (Array.isArray(morganMiddlewares)) {
  morganMiddlewares.forEach(mw => app.use(mw))
} else {
  app.use(morganMiddlewares)
}

// Configuración de Sesión
app.use(
  session({
    secret:
      process.env.SESSION_SECRET ||
      'ajkldfŋæßðđæ€@łgalñ{[½~[7|@#~|@#~@|~kd|@#~124',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Cambiar a true si es HTTPS
      maxAge: 30 * 60 * 1000, // 30 minutos (igual que el token)
    },
  })
)

//MIDDLEWARE para configurar VARIABLES GLOBALES en vistas EJS
app.use(loadUser)
app.use((req, res, next) => {
  res.locals.tituloEJS = 'LearnHub'
  next()
})

// Configuración de Swagger
app.use(
  process.env.SWAGGER_DOCS || "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec),
);

//DEFINIR RUTAS
// Raíz
app.get('/', verifyToken, (req, res) => {
  res.render('home')
})

// API
app.use(baseUrlAPIUsers, userApiRoutes) // devuelven JSON
app.use(baseUrlAPICourses, courseApiRoutes)
app.use(baseUrlAPIEnrollments, enrollmentApiRoutes)

// VISTAS
app.use(baseUrlUsersRSS, userRssRoutes) // renderiza Vistas EJS
app.use(baseUrlCoursesRSS, courseRssRoutes)
app.use(baseUrlEnrollmentsRSS, enrollmentRssRoutes)

// 404 Handler - Si ninguna ruta coincide
app.use((req, res, next) => {
  next(new AppError(`La ruta '${req.originalUrl}' no existe`, 404))
})

// Middleware global de errores avanzado
app.use(errorHandler)

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
  console.log(
    `\n${colorSuccess('✓')} ${colorSuccess('Servidor iniciado correctamente')}`
  )

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
    console.log(`${colorError("✗")} ${colorError(`Error al conectar con MongoDB: ${error}`)}`);
    process.exit(0);
  }
});

// Limpiar consola cada 50 segundos y mostrar URLs principales
// Limpiar consola cada 50 segundos y mostrar URLs principales (Opcional, desactivo para no borrar logs de Morgan)
/*
setInterval(() => {
  console.clear()
  ...
}, 50000)
*/
