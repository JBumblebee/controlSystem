const mongoose = require("mongoose")

const Schema = mongoose.Schema

const equipDataSchema = new Schema({
  date: String,
  secret_key: {
    type: String,
    required: true
  },
  equip: [],
  errNum: Number,
  msg: String
})

module.exports = mongoose.model("equipDatas", equipDataSchema)