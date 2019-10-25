
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const warningSchema = new Schema({
    secret_key: {
        type: String,
        require: true
    },
    power: Number,
    methanal: Number,
    carbon: Number,
    pm25: Number,
    pm10: Number,
    temperature: String,
    humidity: Number,
    startTime: String,
    endTime: String,
})
module.exports = mongoose.model('warnings', warningSchema)