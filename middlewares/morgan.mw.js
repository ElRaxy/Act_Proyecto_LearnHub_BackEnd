require("dotenv").config();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const logsFolder = process.env.LOGS_FOLDER || "./logs/";
const logsActivos = process.env.LOGS_ACTIVOS === "true";

// Asegurar que la carpeta de logs exista
if (logsActivos && !fs.existsSync(logsFolder)) {
  fs.mkdirSync(logsFolder, { recursive: true });
}

morgan.token("local-date", function (req, res) {
  return new Date().toLocaleString("es-ES", {
    timeZone: "Europe/Madrid",
    hour12: false,
  });
});

const morganFormat =
  "[:local-date] :method :url :status :res[content-length] - :response-time ms";

exports.usingMorgan = () => {
  const accessLogEnabled = process.env.ACCESS_LOG === "true";

  if (logsActivos && accessLogEnabled) {
    const stream = fs.createWriteStream(path.join(logsFolder, "access.log"), {
      flags: "a",
    });
    return morgan(morganFormat, { stream });
  }

  // Si no hay log de acceso a archivo, solo por consola
  return morgan("dev");
};
