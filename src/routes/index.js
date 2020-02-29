const router = require('express').Router()

router.use('/user', require('./user'))

router.use('*', (request, response) => {
    response.status(400).json({ error: 'Route not found!' })
})

module.exports = router
