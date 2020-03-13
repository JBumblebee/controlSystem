const express = require('express')
const router = express.Router()
const Control = require('../../../models/EquipControl')

const passport = require('passport')

/**
 * @router GET api/controls/test
 * @desc   返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({ msg: 'ok' })
})

/**
 * @router post api/controls/init/:secret_key
 * @desc 获取所有教学楼课室的设备状态信息
 * @access private
 */
router.post('/init/:secret_key', passport.authenticate('jwt', { session: false }), (req, res) => {
    Control.find({ secret_key: req.params.secret_key }).then(data => {
        if (!data) {
            res.status(404).json('没有任何数据')
        }
        res.json(data)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router post api/controls/search
 * @desc 条件筛选
 * @access private
 */
router.post('/search', passport.authenticate('jwt', { session: false }), (req, res) => {
    Control.find(req.body).then(data => res.json(data))
})

/**
 * @router post api/controls/add
 * @desc 增加教学楼课室的设备状态信息
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const info = {}
    const building = req.body.building
    const classroom = req.body.classroom
    info.building = building
    info.classroom = classroom
    if (req.body.secret_key) info.secret_key = req.body.secret_key
    if (req.body.seceneName) info.seceneName = req.body.seceneName
    if (req.body.seceneNum) info.seceneNum = req.body.seceneNum
    if (req.body.choice) info.choice = eval(req.body.choice)
    if (req.body.desc) info.desc = req.body.desc
    if (req.body.air) info.air = eval(req.body.air)
    if (req.body.lamp) info.lamp = eval(req.body.lamp)
    if (req.body.curtain) info.curtain = eval(req.body.curtain)
    if (req.body.computer) info.computer = eval(req.body.computer)
    if (req.body.projector) info.projector = eval(req.body.projector)
    if (req.body.fan) info.fan = eval(req.body.fan)
    if (req.body.temperature) info.temperature = parseInt(req.body.temperature)

    Control.findOne({ building, classroom }).then(data => {
        if (data) {
            return res.status(404).json('该课室的信息已经存在')
        } else {
            new Control(info).save().then(info => {
                res.json(info)
            })
        }
    })
})

/**
 * @router post api/controls/edit/:id
 * @desc 修改课室设备控制状态
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const info = {}
    if (req.body.building) info.building = req.body.building
    if (req.body.classroom) info.classroom = req.body.classroom
    if (req.body.secret_key) info.secret_key = req.body.secret_key
    if (req.body.seceneName) info.seceneName = req.body.seceneName
    if (req.body.seceneNum) info.seceneNum = req.body.seceneNum
    info.choice = eval(req.body.choice)
    if (req.body.desc) info.desc = req.body.desc
    info.air = eval(req.body.air)
    info.lamp = eval(req.body.lamp)
    info.curtain = eval(req.body.curtain)
    info.computer = eval(req.body.computer)
    info.projector = eval(req.body.projector)
    info.fan = eval(req.body.fan)
    if (req.body.temperature) info.temperature = parseInt(req.body.temperature)
    Control.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: info },
        { new: true }
    ).then(data => res.json(data)).catch(err => res.status(404).json(err))
})

module.exports = router
