const User = require('./../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.login = async (request, response) => {
    const { email, password } = request.body

    if (!email || !password) {
        console.log('Email or password not given!')
        return response.json({ error: 'Email or password not given!' })
    }

    try {
        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            console.log('User not found!')
            return response.json({ error: 'User not found!' })
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) response.json({ err: 'Auth failed!', message: err })

            console.log('\n\n' + result + '\n\n')

            if (!result) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY, {
                    expiresIn: '1h'
                })

                return response.status(200).json({
                    signInData: {
                        message: 'Auth completed successfully',
                        token,
                        user
                    }
                })
            } else {
                console.log('Unknown error!')
                return response.json({ error: 'Unknown error!' })
            }
        })
    } catch (error) {
        console.log(error)
        return response.status(400).json({ error })
    }
}
