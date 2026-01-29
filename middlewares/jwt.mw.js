require('dotenv').config()
const jwt = require('jsonwebtoken')
const appError = require('../utils/AppError')

exports.verifyToken = (req, res, next) => {
  let token = null
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token
  }

  if (!token) {
    if (req.originalUrl.includes('/rss')) {
      return res.redirect('/users/rss/login')
    }
    return next(new appError('No se ha proporcionado un token', 401))
  }

  try {
    //Validar el token
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    if (req.originalUrl.includes('/rss')) {
      res.clearCookie('token')
      return res.redirect('/users/rss/login')
    }
    next(new appError('Token inválido o expirado', 401))
  }
}
