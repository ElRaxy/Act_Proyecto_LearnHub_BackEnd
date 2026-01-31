require("dotenv").config();
const log4js = require("log4js");
const fs = require("fs");

const ruta = process.env.LOGS_FOLDER || "./logs/";
const logsActivos = process.env.LOGS_ACTIVOS === "true";

// Asegurar que la carpeta de logs exista si están activos
if (logsActivos && !fs.existsSync(ruta)) {
  fs.mkdirSync(ruta, { recursive: true });
}

if (logsActivos) {
  log4js.configure({
    appenders: {
      access: {
        type: "dateFile",
        filename: ruta + "access.log",
        pattern: "-yyyy-MM-dd",
        keepFileExt: true,
      },
      error: {
        type: "dateFile",
        filename: ruta + "error.log",
        pattern: "-yyyy-MM-dd",
        keepFileExt: true,
      },
    },
    categories: {
      default: { appenders: ["access"], level: "ALL" },
      access: { appenders: ["access"], level: "ALL" },
      error: { appenders: ["error"], level: "ALL" },
    },
  });
} else {
  log4js.configure({
    appenders: {
      access: { type: "console" },
      error: { type: "console" },
    },
    categories: {
      default: { appenders: ["access"], level: "ALL" },
      access: { appenders: ["access"], level: "ALL" },
      error: { appenders: ["error"], level: "ALL" },
    },
  });
}

const acceso = log4js.getLogger("access");
const loggerError = log4js.getLogger("error");

module.exports = {
  acceso,
  error: loggerError,
  express: log4js.connectLogger(acceso),
};
