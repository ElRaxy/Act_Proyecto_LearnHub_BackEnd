require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const app = express()
const fs = require('fs')
const ruta = process.env.LOGS_FOLDER
const logsActivos = process.env.LOGS_ACTIVOS

exports.usingMorgan = () => {
  return morgan('combined', {
    stream:
      app.get('env') === 'development' && logsActivos === 'true'
        ? fs.createWriteStream(ruta + 'access.log', { flags: 'a' })
        : '', //append (insertar al final del archivo)
  })
}
