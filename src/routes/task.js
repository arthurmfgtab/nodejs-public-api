const router = require('express').Router()
const checkAuth = require('./../middlewares/check-auth')
const taskController = require('./../controllers/task')

router.get('/list/:responsible?', taskController.list)

router.get('/show/:_id', taskController.show)

router.post('/store', taskController.store)

router.put('/update/:_id', taskController.update)

router.delete('/delete/:_id', taskController.delete)

module.exports = router
