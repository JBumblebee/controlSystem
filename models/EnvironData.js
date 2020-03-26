const mongoose = require('mongoose')

const Schema = mongoose.Schema

const environDataSchema = new Schema({
  date: String,
  secret_key: {
    type: String,
    required: true
  },
  environ: {
    air_quality: Number,
    humidity: Number,
    pm10: Number,
    pm25: Number,
    co2: Number,
    meth: Number,
    temp: Number
  },
  tableData: [],
  msg: String
})

module.exports = mongoose.model("environDatas", environDataSchema)
