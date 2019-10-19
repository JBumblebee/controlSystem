const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    avatar: {
        type: String
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    password: {
        type: String,
        required: true
    },
    secret_key: {
        type: String,
        required: true
    },
    identity: {
        type: String,
        required: true,
        default: 'teacher'
    },
    // status: {
    //     type: Number,
    //     enum: [-1, 0, 1],
    //     default: 0

    // },
    date: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('users', UserSchema)