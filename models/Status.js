const mongoose = require('mongoose')

const Schema = mongoose.Schema

const statusSchema = new Schema({
    statusInfo: [
        { statusName: String }
    ]

})

module.exports = mongoose.model('status', statusSchema)