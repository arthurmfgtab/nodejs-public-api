const User = require('./../models/user')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

exports.list = async (_, response) => {
    try {
        const users = await User.find().select('+password')
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
        await bcrypt.hash(password, 10, async (error, hash) => {
            if (error) {
                console.log(error)
                return response.json({ error })
            }

            console.log(hash)

            const _id = mongoose.Types.ObjectId()
            const newUser = await User.create({
                _id,
                name,
                email,
                password: hash
            })

            if (newUser) response.status(200).json({ newUser })
            else response.status(400).json({ error: 'Some error occured!' })
        })
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
            if (!user) response.json({ error: "User doesn't exist!" })
            if (error) response.json({ error })

            user.name = name && name
            user.email = email && email

            user.save(error => {
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
        const user = User.find({ _id })
        if (!user) response.json({ error: 'User not found!' })
        await User.deleteOne({ _id }, error => {
            if (error) response.json({ error })
            response.json({ message: 'User deleted!' })
        })
    } catch (error) {
        console.log(error)
        return response.json({ error })
    }
}
