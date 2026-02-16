const app = require('../app')
const { conectarMongoDB } = require('../utils/mongodb.config')

module.exports = async (req, res) => {
  await conectarMongoDB()
  return app(req, res)
}
