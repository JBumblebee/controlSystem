const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EquipSchema = new Schema({
    secret_key: {
        type: String,
        required: true
    },
    schoolName: {
        type: String
    },
    building: {
        type: String
    },
    classroom: {
        type: String
    },
    code: {
        type: String
    },
    name: {
        type: String
    },
    sn: {
        type: String
    },
    type: {
        type: String
    },
    factory: {
        type: String
    },
    brand: {
        type: String
    },
    model: {
        type: String
    },
    status: {
        type: String
    },
    remark: {
        type: String
    },
    bindType: {
        type: String
    },
    address: {
        type : String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Equip', EquipSchema)