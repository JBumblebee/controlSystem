
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const factorySchema = new Schema({
    factorys: [
        { factoryName: String }
    ]
})
module.exports = mongoose.model('factorys', factorySchema)

