//REQUIRES / IMPORTS
require('dotenv').config()

const http = require('http')
const app = require('./app')
const mongodbConfig = require('./utils/mongodb.config')

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

const port = process.env.PORT || process.env.PUERTO || 3000

http.createServer(app).listen(port, async () => {
  // Banner inicial con título y URLs del servidor y Swagger
  const topLine = '┌─────────────────────────────────────────────────────┐'
  const innerWidth = topLine.length - 2 // ancho sin las barras verticales
  const title = 'LearnHub'
  const titlePadding = Math.floor((innerWidth - title.length) / 2)
  const titleRightPadding = innerWidth - titlePadding - title.length

  const baseSwagger = process.env.SWAGGER_DOCS || '/api-docs'

  const banner = [
    topLine,
    `│${' '.repeat(titlePadding)}${title}${' '.repeat(titleRightPadding)}│`,
    `│${'─'.repeat(innerWidth)}│`,
    `│  Servidor: http://localhost:${port}${' '.repeat(innerWidth - 0 - `  Servidor: http://localhost:${port}`.length)}│`,
    `│  Swagger : http://localhost:${port}${baseSwagger}${' '.repeat(innerWidth - 0 - `  Swagger : http://localhost:${port}${baseSwagger}`.length)}│`,
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
    console.log(
      `${colorError('✗')} ${colorError(`Error al conectar con MongoDB: ${error}`)}`
    )
    process.exit(0)
  }
})
