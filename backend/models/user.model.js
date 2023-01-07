const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require
    },
    phone: {
        type: Number,
        require
    },
    email: {
        type: String,
        require
    },
    password: {
        type: String,
        require
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('user', userSchema)