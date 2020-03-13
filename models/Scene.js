const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sceneSchema = new Schema({
    secret_key: String,
    sceneName: String,
    desc: String,
    air: Boolean,
    lamp: Boolean,
    curtain: Boolean,
    computer: Boolean,
    projector: Boolean,
    fan: Boolean,
    temperature: Number
})

module.exports = mongoose.model('scenes', sceneSchema)