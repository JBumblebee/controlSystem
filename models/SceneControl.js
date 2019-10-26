const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sceneControl = mongoose.Schema({
    secret_key :String,
    building: String,
    classroom: String,
    sceneName: Number,
    choice: Boolean
})

module.exports = mongoose.model('scenecontrols', sceneControl)