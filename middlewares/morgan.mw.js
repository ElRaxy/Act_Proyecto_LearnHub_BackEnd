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

exports.usingMorgan = () => {
  const stream = logsActivos
    ? fs.createWriteStream(path.join(logsFolder, "access.log"), { flags: "a" })
    : process.stdout;

  return morgan("combined", { stream });
};
