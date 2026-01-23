require('dotenv').config()
const log4js = require('log4js')

const ruta = process.env.LOGS_FOLDER
const logsActivos = process.env.LOGS_ACTIVOS

if (logsActivos === 'true' && process.env.NODE_ENV === 'development') {
  log4js.configure({
    appenders: {
      access: {
        type: 'dateFile',
        filename: ruta + 'access.log',
        pattern: '-yyyy-MM-dd',
      },
      error: {
        type: 'dateFile',
        filename: ruta + 'error.log',
        pattern: '-yyyy-MM-dd',
      },
    },
    categories: {
      default: { appenders: ["access"], level: "ALL" },
      access: { appenders: ["access"], level: "ALL" },
      error: { appenders: ["error"], level: "ALL" }
    }
  })
} else {
  log4js.configure({
    appenders: {
      access: { type: "console" },
      error: { type: "console" }
    },
    categories: {
      default: { appenders: ["access"], level: "ALL" },
      access: { appenders: ["access"], level:"ALL" },
      error: { appenders: ["error"], level:"ALL" }
    }
  })
}

const acceso = log4js.getLogger('access')
const err = log4js.getLogger('error')

module.exports = {
  acceso,
  error: err,
  express: log4js.connectLogger(acceso),
}
