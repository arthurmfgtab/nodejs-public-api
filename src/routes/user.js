const router = require('express').Router()
const checkAuth = require('../middlewares/check-auth')
const userController = require('../controllers/user')

router.get('/list', userController.list)

router.get('/show/:_id', userController.show)

router.post('/store', userController.store)

router.put('/update/:_id', userController.update)

router.delete('/delete/:_id', userController.delete)

module.exports = router
