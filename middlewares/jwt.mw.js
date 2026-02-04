const jwt = require('jsonwebtoken')
const appError = require('../utils/AppError')

// Carga el usuario en locals sin bloquear la petición si no hay token
exports.loadUser = (req, res, next) => {
  let token = null

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = decoded
      res.locals.currentUser = decoded
    } catch (error) {
      res.locals.currentUser = null
    }
  } else {
    res.locals.currentUser = null
  }
  next()
}

exports.verifyToken = (req, res, next) => {
  if (req.user) {
    res.locals.currentUser = req.user
    return next()
  }

  let token = null
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    if (req.originalUrl.includes('/views')) {
      return res.redirect('/users/views/login')
    }
    return next(new appError('No se ha proporcionado un token', 401))
  }

  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    res.locals.currentUser = decoded
    next()
  } catch (error) {
    if (req.originalUrl.includes('/views')) {
      res.clearCookie('token')
      return res.redirect('/users/views/login')
    }
    next(new appError('Token inválido o expirado', 401))
  }
}
