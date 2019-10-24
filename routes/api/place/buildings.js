const express = require('express')
const router = express.Router()
const Building = require('../../../models/Building')

const passport = require('passport')

/**
 * @router GET api/place/test
 * @desc   返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({ msg: '可以获取地理位置信息！' })
})

/**
 * @router POST api/place/getall
 * @desc   返回请求的json数据
 * @access private
 */
router.post('/getall', passport.authenticate('jwt', { session: false }), (req, res) => {
    Building.find().then(buildings => {
        if (!buildings) { res.status(404).json('没有任何数据') }
        res.json(buildings)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/place/getBySchool/:secret_key
 * @desc   返回请求的json数据
 * @access private
 */
router.post('/getBySchool/:secret_key', passport.authenticate('jwt', { session: false }), (req, res) => {
    Building.find({ secret_key: req.params.secret_key }).then(buildings => {
        if (!buildings) { res.status(404).json('没有任何数据') }
        res.json(buildings)
    }).catch(err => res.status(404).json(err))
})

module.exports = router
