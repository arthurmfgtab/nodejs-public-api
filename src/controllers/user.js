const User = require('../models/user')
const mongoose = require('mongoose')

exports.list = async (request, response) => {

    try {
        const users = await User.find()
        if (users.length > 0) response.json({ users })
        else response.json({ message: 'No user registered!' }) 

    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.show = async (request, response) => {

    const { _id } = request.params

    try {
        let user = await User.findOne({ _id })
        if (!user) response.json({ error: "User doesn't exists" })

        user = await User.findById({ _id }) 
        return response.json({ user })

    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.store = async (request, response) => {
    
    const { name, email, password } = request.body
    const user = await User.findOne({ email })

    if (user) return response.json({ error: 'Email in use!' })
    
    try {
        const _id = mongoose.Types.ObjectId()
        const newUser = await User.create({ _id, name, email, password })

        if (newUser) response.status(200).json({ newUser })
        else response.status(400).json({ error: 'Some error occured!' })

    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.update = async (request, response) => {

    const { _id } = request.params
    const { name, email } = request.body

    try {
        await User.findOne({ _id }, (error, user) => {

            if (!user) return response.json({ error: "User doesn't exist!" })

            user.name = name,
            user.email = email

            user.save((error) => {
                if (error) return response.json({ error })
                return response.json({ user })
            })
        })

    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}

exports.delete = async (request, response) => {

    const { _id } = request.params

    try {
        await User.deleteOne({ _id }, (error) => {
            if (error) response.json({ error })
            response.json({ message: 'User deleted!' })
        })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}
