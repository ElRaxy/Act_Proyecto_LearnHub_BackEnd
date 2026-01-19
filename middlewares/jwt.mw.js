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

  if(req.cookies.token){
    token = req.cookies.token
  }

  if (!token) {
    return next(new appError('No se ha proporcionado un token', 401))
  }

  try {
    //Validar el token
    let decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded //. paylod --> req.user
    next()//.TODO OK -> next()
  } catch (error) {
    next(new appError('Token inválido o expirado. Desc: ' + error, 401))
  }
}
