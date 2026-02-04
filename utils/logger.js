require("dotenv").config();
const log4js = require("log4js");
const fs = require("fs");

const ruta = process.env.LOGS_FOLDER || "./logs/";
const logsActivos = process.env.LOGS_ACTIVOS === "true";

// Asegurar que la carpeta de logs exista si están activos
if (logsActivos && !fs.existsSync(ruta)) {
  fs.mkdirSync(ruta, { recursive: true });
}

const appenders = {};
const categories = {
  default: { appenders: ["console"], level: "ALL" },
  access: { appenders: [], level: "ALL" },
  error: { appenders: [], level: "ALL" },
};

// Siempre tener un appender de consola disponible
appenders.console = { type: "console" };

const layout = {
  type: "pattern",
  pattern: "[%d{yyyy-MM-dd hh:mm:ss}] [%p] %c - %m",
};

if (logsActivos) {
  if (process.env.ACCESS_LOG === "true") {
    appenders.access = {
      type: "dateFile",
      filename: ruta + "access.log",
      pattern: "-yyyy-MM-dd",
      keepFileExt: true,
      layout,
    };
    categories.access.appenders.push("access");
    // Si el log de acceso está activo, lo usamos como default también
    categories.default.appenders = ["access"];
  } else {
    appenders.console_access = { type: "console", layout };
    categories.access.appenders.push("console_access");
  }

  if (process.env.ERROR_LOG === "true") {
    appenders.error = {
      type: "dateFile",
      filename: ruta + "error.log",
      pattern: "-yyyy-MM-dd",
      keepFileExt: true,
      layout,
    };
    categories.error.appenders.push("error");
    // Si no hay log de acceso, el error log puede ser el default
    if (categories.default.appenders[0] === "console") {
      categories.default.appenders = ["error"];
    }
  } else {
    appenders.console_error = { type: "console", layout };
    categories.error.appenders.push("console_error");
  }
} else {
  appenders.console_log = { type: "console", layout };
  categories.access.appenders.push("console_log");
  categories.error.appenders.push("console_log");
}

log4js.configure({ appenders, categories });

const acceso = log4js.getLogger("access");
const loggerError = log4js.getLogger("error");

module.exports = {
  acceso,
  error: loggerError,
  express: log4js.connectLogger(acceso),
};
