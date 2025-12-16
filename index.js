//REQUIRES / IMPORTS
require('dotenv').config() //npm i dotenv
const port = process.env.PORT || process.env.PUERTO
const express = require('express')
const app = express()
const path = require('path') //npm i path
const methodOverride = require('method-override') //npm i method-override
const cors = require('cors') //npm i cors
const courseRoutes = require('./routes/course.routes')
const enrollmentRoutes = require('./routes/enrollement.routes')
const userRoutes = require('./routes/user.routes')
const baseUrlCourses = `/api/${process.env.API_VERSION}/courses`
const baseUrlEnrollments = `/api/${process.env.API_VERSION}/enrollments`
const baseUrlUsers = `/api/${process.env.API_VERSION}/users`

const mongodbConfig = require('./utils/mongodb.config')

//SETUP - MIDDLEWARES
app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs') //npm i ejs (SSR)
app.use(express.static(path.join(__dirname, 'public')))
//Para poder leer datos (request body) en métodos POST
app.use(express.urlencoded({ extended: true }))
//Leer datos JSON en request body POST
app.use(express.json())
app.use(methodOverride('_method'))

//MIDDLEWARE para configurar VARIABLES GLOBALES en vistas EJS
app.use((req, res, next) => {
  res.locals.tituloEJS = 'LearnHub'
  next()
})


//DEFINIR RUTAS
//Raíz

app.get('/', (req, res) => {
  fs.readFile('./public/index.html', 'utf8', (err, data) => {
    res.send(data)
  })
})
app.use(baseUrlCourses, courseRoutes)
app.use(baseUrlEnrollments, enrollmentRoutes)
app.use(baseUrlUsers, userRoutes)

//Rutas por defecto
//Si no se especifica ninguna ruta, redirigir a el index.html
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

// Middleware global de errores
app.use((err, req, res, next) => {
  const status = err.status || 500

  res.status(status).render('error', {
    status,
    message: err.message || 'Fallo interno',
    source: err.source || 'Sistema'
  })
})

//LEVANTAR EL SERVER
app.listen(port, async () => {
  console.log(`Servidor levantado en http://localhost:${port}`)
  try {
    //Una vez levantado el servidor, intentamos conectar con MongoDB
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
    //Si no conectamos con MongoDB, debemos tumbar el server
    console.log(`Error al conectar con MongoDB. Desc: ${error}`)
    //Tumbar el server
    process.exit(0)
  }
})

//* Limpiar la consola del server
setInterval(() => {
  console.clear()
  console.log(
    'Consola limpiada automáticamente:',
    new Date().toLocaleTimeString()
  )
  console.log(`Servidor levantado en http://localhost:${port}`)
}, 50000)
