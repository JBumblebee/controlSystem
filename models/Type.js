const mongoose = require('mongoose')

const Schema = mongoose.Schema

const typeSchema = new Schema({
    types: [
        { typeName: String }
    ]

})

module.exports = mongoose.model('types', typeSchema)