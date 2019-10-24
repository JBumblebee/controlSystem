
const mongoose = require('mongoose')

const Schema = mongoose.Schema

const buildingSchema = new Schema({
    secret_key: {
        type: String,
        required: true
    },
    building: [
        {
            value: String,
            label: String,
            children: [
                { value: String, label: String }
            ]
        }
    ]
})
module.exports = mongoose.model('buildings', buildingSchema)