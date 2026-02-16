const logger = require('../utils/logger')

exports.errorHandler = (err, req, res, next) => {
  const status = err.status || 500
  const message = err.message || 'Fallo interno del servidor'

  // LOG de error (solo si está activo en el util/logger)
  logger.error.error(`Error Handler(${status}): ${message}`)
  if (process.env.node_env === 'development') {
    console.error('Detalle del error:', err)
  }

  // Si la cabecera ya se envió, delegar al manejador por defecto de express
  if (res.headersSent) {
    return next(err)
  }

  // 1. Detectar si es una petición de API (JSON)
  // Comprobamos la URL o si el cliente explícitamente pide JSON (Postman/Insomnia)
  const isApiRequest =
    req.originalUrl.startsWith('/api') ||
    (req.headers.accept && req.headers.accept.includes('application/json'))

  if (isApiRequest) {
    const errorResponse = {
      timestamp: new Date().toLocaleString('es-ES', {
        timeZone: 'Europe/Madrid',
        hour12: false,
      }),
      path: req.originalUrl,
      status,
      error: message,
    }

    // Stack trace solo en consola para no ensuciar el JSON
    if (process.env.node_env === 'development') {
      // console.error(err.stack); // Ya lo hace el logger al principio
    }

    return res.status(status).json(errorResponse)
  }

  // 2. Detectar si es una petición de VISTA (Render)
  // Nota: Los errores de validación de formularios suelen manejarse localmente en los controladores.
  // Este handler captura errores no controlados (404, fallos de BD, etc.)
  res.status(status).render('error', {
    status,
    message,
    source: err.source || 'Sistema',
  })
}
