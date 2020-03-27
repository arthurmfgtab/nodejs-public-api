/**
 * This file contains every route stack of the application,
 * so the app.js file only need to import this file using
 * 'const routes = require('./routes')'
 *
 * OBS: (there's no need to put the name of this file on the require
 * line abose since its name's 'index')
 */

const router = require('express').Router()

/**
 * Since we have only 3 route files these 3 are imported here.
 */
router.use('/user', require('./user'))
router.use('/task', require('./task'))
router.use('/auth', require('./auth'))

/**
 * A very simple error message in case the request hit no known route
 */
const error = 'Route not found!'
router.use('*', (_, response) => response.status(404).json({ error }))

module.exports = router
