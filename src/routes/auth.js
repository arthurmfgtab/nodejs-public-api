const router = require('express').Router()
const checkAuth = require('./../middlewares/check-auth')
const authController = require('./../controllers/auth')

router.post('/login', authController.login)

module.exports = router
