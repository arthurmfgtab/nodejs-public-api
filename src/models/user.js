const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        default: null
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true,
        select: false
    }
})

module.exports = mongoose.model('User', userSchema)
