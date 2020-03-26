const mongoose = require('mongoose')

const Schema = mongoose.Schema

const eleDataSchema = new Schema({
  date: String,
  secret_key: {
    type: String,
    required: true
  },
  electricity: [],
  msg: String
})

module.exports = mongoose.model("eleDatas", eleDataSchema)
