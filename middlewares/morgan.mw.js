require('dotenv').config()
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')

const logsFolder = process.env.LOGS_FOLDER || './logs/'
const logsActivos = process.env.LOGS_ACTIVOS === 'true'

// Asegurar que la carpeta de logs exista
if (logsActivos && !fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder, { recursive: true })
}

morgan.token('local-date', function (req, res) {
  return new Date().toLocaleString('es-ES', {
    timeZone: 'Europe/Madrid',
    hour12: false,
  })
})

// Colores ANSI para terminal
const COLORS = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
}

// Tokens personalizados con colores
morgan.token('colored-method', req => {
  const colors = {
    GET: COLORS.cyan,
    POST: COLORS.green,
    PUT: COLORS.yellow,
    DELETE: COLORS.red,
  }
  const color = colors[req.method] || COLORS.reset
  return `${color}${COLORS.bright}${req.method}${COLORS.reset}`
})

morgan.token('colored-status', (req, res) => {
  const status = res.statusCode
  const color =
    status >= 400 ? COLORS.red : status >= 300 ? COLORS.yellow : COLORS.green
  return `${color}${COLORS.bright}${status}${COLORS.reset}`
})

const consoleFormat = `${COLORS.cyan}[:local-date]${COLORS.reset} :colored-method :url ${COLORS.yellow}:colored-status${COLORS.reset} :res[content-length] ${COLORS.bright}:response-time ms${COLORS.reset}`
const fileFormat =
  '[:local-date] :method :url :status :res[content-length] - :response-time ms'

exports.usingMorgan = () => {
  const accessLogEnabled = process.env.ACCESS_LOG === 'true'

  // Siempre retorna consola con colores
  if (logsActivos && accessLogEnabled) {
    const stream = fs.createWriteStream(path.join(logsFolder, 'access.log'), {
      flags: 'a',
    })
    // Registrar ambos formatos
    morgan.format('console-format', consoleFormat)
    morgan.format('file-format', fileFormat)

    // Retorna array con dos instancias: consola coloreada + archivo sin color
    return [
      morgan(consoleFormat), // Para consola
      morgan(fileFormat, { stream }), // Para archivo
    ]
  }

  // Si no hay logs activos, solo consola
  morgan.format('console-format', consoleFormat)
  return morgan(consoleFormat)
}
