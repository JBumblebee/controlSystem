const mongoose = require('mongoose')
const Schema = mongoose.Schema

const controlSchema = new Schema({
  secret_key: String,
  building: String,
  classroom: String,
  sceneName: String,
  sceneNum: Number,
  choice: Boolean,
  desc: String,
  air: Boolean,
  lamp: Boolean,
  curtain: Boolean,
  computer: Boolean,
  projector: Boolean,
  fan: Boolean,
  temperature: Number,
})

module.exports = mongoose.model('controls', controlSchema)