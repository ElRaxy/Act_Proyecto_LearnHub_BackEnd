const express = require('express')
const router = express.Router()
const userApiController = require('../../controllers/api/user.api.controller')

// API JSON
router.get('/', userApiController.getAllUsers)
router.post('/', userApiController.createUser)
router.get('/show/:id', userApiController.getById)
router.put('/:id', userApiController.editUser)
router.delete('/:id', userApiController.deleteUser)

module.exports = router
