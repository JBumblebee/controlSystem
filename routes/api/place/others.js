const express = require('express')
const router = express.Router()
const Factory = require('../../../models/Factory')
const Type = require('../../../models/Type')
const Status = require('../../../models/Status')
const Warning = require('../../../models/Warning')

// const passport = require('passport')

/**
 * @router GET api/others/getFactory
 * @desc   返回请求的json数据
 * @access public
 */
router.get('/getFactory', (req, res) => {
    Factory.find().then(factorys => {
        if (!factorys) { res.status(404).json('没有任何数据') }
        res.json(factorys)
    }).catch(err => res.status(404).json(err))
})


/**
 * @router GET api/others/getType
 * @desc  返回请求的json数据
 * @access public
 */
router.get('/getType', (req, res) => {
    Type.find().then(types => {
        if (!types) {
            res.status(404).json('没有任何数据')
        }
        res.json(types)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router GET api/others/getStatus
 * @desc  返回请求的json数据
 * @access public
 */
router.get('/getStatus', (req, res) => {
    Status.find().then(statusInfo => {
        if (!statusInfo) {
            res.status(404).json('没有任何数据')
        }
        res.json(statusInfo)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router GET api/others/getWarningSetings/:secret_key
 * @desc  返回请求的json数据
 * @access public
 */
router.get('/getWarningSetings/:secret_key', (req, res) => {
    Warning.find({ secret_key: req.params.secret_key }).then(types => {
        if (!types) {
            res.status(404).json('没有任何数据')
        }
        res.json(types)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/others/editWarning/:id
 * @desc  编辑预警信息
 * @access public
 */
router.post('/editWarning/:id', (req, res) => {
    const warn = {}
    if (req.body.secret_key) warn.secret_key = req.body.secret_key
    if (req.body.power) warn.power = parseFloat(req.body.power)
    if (req.body.methanal) warn.methanal = parseInt(req.body.methanal)
    if (req.body.carbon) warn.carbon = parseInt(req.body.carbon)
    if (req.body.pm25) warn.pm25 = parseInt(req.body.pm25)
    if (req.body.pm10) warn.pm10 = parseInt(req.body.pm10)
    if (req.body.temperature) warn.temperature = JSON.stringify(req.body.temperature)
    if (req.body.humidity) warn.humidity = parseInt(req.body.humidity)
    if (req.body.startTime) warn.startTime = req.body.startTime
    if (req.body.endTime) warn.endTime = req.body.endTime
    Warning.findOneAndUpdate(
        { _id: req.params.id },
        { $set: warn },
        { new: true }
    ).then(warn => res.json(warn))
})

/**
 * @router POST api/others/editWarning
 * @desc  增加新一学校预警信息
 * @access public
 */
router.post('/addWarning', (req, res) => {
    const warn = {}
    if (req.body.secret_key) warn.secret_key = req.body.secret_key
    if (req.body.power) warn.power = parseFloat(req.body.power)
    if (req.body.methanal) warn.methanal = parseInt(req.body.methanal)
    if (req.body.carbon) warn.carbon = parseInt(req.body.carbon)
    if (req.body.pm25) warn.pm25 = parseInt(req.body.pm25)
    if (req.body.pm10) warn.pm10 = parseInt(req.body.pm10)
    if (req.body.temperature) warn.temperature = req.body.temperature
    if (req.body.humidity) warn.humidity = parseInt(req.body.humidity)
    if (req.body.startTime) warn.startTime = req.body.startTime
    if (req.body.endTime) warn.endTime = req.body.endTime

    new Warning(warn).save().then(warn => {
        res.json(warn)
    })
})

module.exports = router
