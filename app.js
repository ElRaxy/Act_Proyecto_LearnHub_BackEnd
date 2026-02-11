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

const app = express()
const isProd = process.env.NODE_ENV === 'production'
const apiVersion = process.env.API_VERSION || 'v1'

// ROUTES
const courseRssRoutes = require('./routes/course.routes')
const enrollmentRssRoutes = require('./routes/enrollment.routes')
const userRssRoutes = require('./routes/user.routes')

const courseApiRoutes = require('./routes/api/course.api.routes.js')
const enrollmentApiRoutes = require('./routes/api/enrollment.api.routes.js')
const userApiRoutes = require('./routes/api/user.api.routes.js')

// BASE URLS
const baseUrlAPICourses = `/api/${apiVersion}/courses`
const baseUrlAPIEnrollments = `/api/${apiVersion}/enrollments`
const baseUrlAPIUsers = `/api/${apiVersion}/users`

const baseUrlUsersRSS = `/users/views`
const baseUrlCoursesRSS = `/courses/views`
const baseUrlEnrollmentsRSS = `/enrollments/views`

//SETUP - MIDDLEWARES
const extraOrigins = []
if (process.env.FRONTEND_URL) extraOrigins.push(process.env.FRONTEND_URL)
if (process.env.VERCEL_URL) extraOrigins.push(`https://${process.env.VERCEL_URL}`)

const whiteList = [
  'http://localhost:5500',
  'http://127.0.0.1:5500',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3010',
  'http://127.0.0.1:3010',
  'https://localhost:5173',
  'https://127.0.0.1:5173',
  'https://localhost:3010',
  'https://127.0.0.1:3010',
  ...extraOrigins,
].filter(Boolean)

const corsOptions = {
  origin: (origin, callback) => {
    if (origin) console.log('ORIGIN:', origin)
    if (whiteList.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new AppError('No pasarás!', 403))
    }
  },
  credentials: true, //Envío COOKIES desde el BackEnd al FrontEnd
}

app.set('trust proxy', 1)
app.use(cors(corsOptions))
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
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
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
  process.env.SWAGGER_DOCS || '/api-docs',
  swaggerUI.serve,
  swaggerUI.setup(swaggerSpec)
)

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

module.exports = app
