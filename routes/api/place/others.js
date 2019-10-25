const express = require('express')
const router = express.Router()
const Factory = require('../../../models/Factory')
const Type = require('../../../models/Type')
const Status = require('../../../models/Status')

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




module.exports = router
