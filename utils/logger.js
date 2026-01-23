//winston (otra librerí­a para logs de express)
require("dotenv").config()
const log4js = require("log4js") //npm i log4js
const ruta = process.env.LOGS_FOLDER
const logsActivos = process.env.LOGS_ACTIVOS
const express = require("express")
const app = express()

console.log(app.get("env"))

if(logsActivos === "true" && app.get("env") === "development"){
    log4js.configure({
        appenders: {
            access: {
                type:"dateFile",
                filename: ruta + "access.log",
                pattern:"-yyyy-MM-dd"
            },
            error: {
                type:"dateFile",
                filename: ruta + "error.log",
                pattern:"-yyyy-MM-dd"
            }
        },
        categories:{
            default: { appenders: ["access"], level: "ALL"},
            access: { appenders: ["access"], level:"ALL"},
            error: { appenders: ["error"], level:"ALL"}
        }
    })
} else {
    log4js.configure({
        appenders: {
            access: { type: "console"},
            error: { type: "console"}
        },
        categories: {
            default: { appenders: ["access"], level: "ALL"},
            access: { appenders: ["access"], level:"ALL"},
            error: { appenders: ["error"], level:"ALL"}
        }
    })
}

const acceso = log4js.getLogger("access")
const err = log4js.getLogger("error")

module.exports = {
    access: acceso,
    error: err,
    express: log4js.connectLogger(acceso)
}