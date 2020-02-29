const jwt = require('jsonwebtoken')

checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const tokenDecoded = jwt.verify(token, process.env.JWT_KEY)
        req._id = tokenDecoded._id
        next()
    } catch (erro) {
        return res.status(401).json({
            error: 'Auth failed, token not found!',
        })
    }
}

module.exports = checkAuth