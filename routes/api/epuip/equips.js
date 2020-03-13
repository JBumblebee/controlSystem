const express = require('express')
const router = express.Router()
const passport = require('passport')

const Equip = require('../../../models/Equip')

/**
 * @router GET api/equips/test
 * @desc   返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({ msg: '设备接口可以使用了！' })
})

/**
 * @router POST api/equips/add
 * @desc   添加设备信息
 * @access private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const equip = {}

    if (req.body.secret_key) equip.secret_key = req.body.secret_key
    if (req.body.schoolName) equip.schoolName = req.body.schoolName
    if (req.body.building) equip.building = req.body.building
    if (req.body.classroom) equip.classroom = req.body.classroom
    if (req.body.code) equip.code = req.body.code
    if (req.body.name) equip.name = req.body.name
    if (req.body.sn) equip.sn = req.body.sn
    if (req.body.type) equip.type = req.body.type
    if (req.body.factory) equip.factory = req.body.factory
    if (req.body.brand) equip.brand = req.body.brand
    if (req.body.model) equip.model = req.body.model
    if (req.body.status) equip.status = req.body.status
    if (req.body.remark) equip.remark = req.body.remark
    if (req.body.bindType) equip.bindType = req.body.bindType
    if (req.body.address) equip.address = req.body.address

    new Equip(equip).save().then(equip => {
        res.json(equip)
    })
})

/**
 * @router POST api/equips/addMany
 * @desc   添加模板导入的设备信息
 * @access private
 */
router.post('/addMany', passport.authenticate('jwt', { session: false }), (req, res) => {
    Equip.insertMany(req.body).then(result => {
        res.json(result)
    })
})


/**
 * @router POST api/equips/delete/:id
 * @desc   删除设备信息
 * @access private
 */
router.post('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.params.id)
    Equip.findOneAndRemove({ _id: req.params.id }).then(equip => {
        res.json('删除成功')
    }).catch(err => {
        res.status(404).json(err)
    })
})

/**
 * @router POST api/equips/deleteMany
 * @desc   批量删除设备信息
 * @access private
 */
router.post('/deleteMany', passport.authenticate('jwt', { session: false }), (req, res) => {
    Equip.deleteMany({ _id: { $in: req.body } }).then((result) => {
        res.json('批量删除成功')
    })
})

/**
 * @router POST api/equips/edit/:id
 * @desc   编辑设备信息
 * @access private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const equip = {}

    if (req.body.secret_key) equip.secret_key = req.body.secret_key
    if (req.body.schoolName) equip.schoolName = req.body.schoolName
    if (req.body.building) equip.building = req.body.building
    if (req.body.classroom) equip.classroom = req.body.classroom
    if (req.body.code) equip.code = req.body.code
    if (req.body.name) equip.name = req.body.name
    if (req.body.sn) equip.sn = req.body.sn
    if (req.body.type) equip.type = req.body.type
    if (req.body.factory) equip.factory = req.body.factory
    if (req.body.brand) equip.brand = req.body.brand
    if (req.body.model) equip.model = req.body.model
    if (req.body.status) equip.status = req.body.status
    if (req.body.remark) equip.remark = req.body.remark
    if (req.body.bindType) equip.bindType = req.body.bindType
    if (req.body.address) equip.address = req.body.address

    Equip.findOneAndUpdate(
        { _id: req.params.id },
        { $set: equip },
        { new: true }).then(equip => {
            res.json(equip)
        }).catch(err => {
            res.status(404).json('更新失败')
        })
})

/**
 * @router GET api/equips
 * @desc   获取所有设备信息
 * @access private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    Equip.find().then(equips => {
        if (!equips) {
            res.status(404).json('没有任何内容')
        }
        res.json(equips)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/equips/getEquips/:secret_key
 * @desc   获取某一学校设备信息
 * @access private
 */
router.post('/getEquips/:secret_key', passport.authenticate('jwt', { session: false }), (req, res) => {
    Equip.find({ secret_key: req.params.secret_key }).then(equips => {
        if (!equips) {
            res.status(404).json('没有任何数据')
        }
        res.json(equips)
    }).catch(err => res.status(404).json(err))
})
/**
 * @router POST api/equips/search
 * @desc   按条件查询
 * @access private
 */
router.post('/search', passport.authenticate('jwt', { session: false }), (req, res) => {
    const query = {}
    if (req.body.secret_key) query.secret_key = req.body.secret_key
    if (req.body.building) query.building = req.body.building
    if (req.body.classroom) query.classroom = req.body.classroom
    if (req.body.factory) query.factory = req.body.factory
    if (req.body.type) query.type = req.body.type
    if (req.body.status) query.status = req.body.status

    Equip.find(query).then(equips => {
        if (!equips) {
            res.status(404).json('没有任何数据')
        }
        res.json(equips)
    }).catch(err => res.status(404).json(err))
})
module.exports = router