const jwt = require('jsonwebtoken')

/**
 * This file is a middleware used to check if the user requester is
 * authenticated so it can access the information it wants.
 *
 * We first get the token passed by the client/requester. This token
 * comes like this -> "Bearer 23u482349832849j3298jd" (without double quotes),
 * that's what we're using the split function. This function transform the
 * token string into an array of strings, cutting the token passed using the
 * argument we're passing to the split function, in this case a space.
 * So, the token que comes like this -> "Bearer 23u482349832849j3298jd"
 * simply becomes this -> ["Bearer", "23u482349832849j3298jd"]
 * The '[1]' at the end of the line simply gets the second index of this
 * array, in this case de token itself (the 'Bearer' is not important for us).
 *
 * Ok, possessing the token extracted um decode it using a function provided
 * by JWT package, the verify function. This function's going to compare the
 * token we've got with the JWT_KEY that we keep in .env file (this key is
 * simply a strange string chosen by the backend dev which the the client
 * can't know).
 *
 * So, if everything's ok we use next function to keep the chain ok.
 * Ok, but what chain?
 *
 * Get this route, for example: router.post('/store', checkAuth, taskController.store)
 *
 * We can see that between the route string and the controller function that
 * handle the action the request want to execute there's a middleware.
 * Our check-auth here is that middleware.
 *
 * OBS: Even though in this route example we've only got 1 middleware nothing
 * stop the dev to put more than 1 middleware, that's why it's chain, a chain
 * of middlewares :)
 *
 * So, if the middleware let the requester passing through it, it calls the
 * next function, meaning that the requester can to either the next middleware
 * or the controller function it's chasing.
 */

exports.checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const tokenDecoded = jwt.verify(token, process.env.JWT_KEY)
        req._id = tokenDecoded._id
        next()
    } catch (erro) {
        const error = 'Auth failed, token not found!'
        return res.status(401).json({ error })
    }
}
