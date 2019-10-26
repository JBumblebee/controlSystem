const Scene = require('../../../models/Scene')
const SceneControl = require('../../../models/SceneControl')

const express = require('express')

const router = express.Router()

/**
 * @router GET api/scenes/test
 * @desc  测试
 * @access public
 */
router.get('/test', (req, res) => {
    res.json('可以接收到信息')
})

/**
 * @router POST api/scenes/add
 * @desc  增加场景
 * @access public
 */
router.post('/add', (req, res) => {
    const demo = {}
    if (req.body.secret_key) demo.secret_key = req.body.secret_key
    if (req.body.sceneName) demo.sceneName = req.body.sceneName
    if (req.body.desc) demo.desc = req.body.desc
    if (req.body.air) demo.air = eval(req.body.air)
    if (req.body.lamp) demo.lamp = req.body.lamp === 'true' ? true : false
    if (req.body.curtain) demo.curtain = eval(req.body.curtain)
    if (req.body.computer) demo.computer = eval(req.body.computer)
    if (req.body.projector) demo.projector = eval(req.body.projector)
    if (req.body.fan) demo.fan = eval(req.body.fan)
    if (req.body.num) demo.num = parseInt(req.body.num)

    new Scene(demo).save().then(demo => {
        res.json(demo)
    })
})

/**
 * @router GET api/scenes/getScenes/:secret_key
 * @desc  测试
 * @access public
 */
router.get('/getScenes/:secret_key', (req, res) => {
    Scene.find({ secret_key: req.params.secret_key }).then(scenes => {
        res.json(scenes)
    })
})


/**
 * @router POST api/scenes/add
 * @desc  增加场景
 * @access public
 */
router.post('/edit/:id', (req, res) => {
    const demo = {}
    if (req.body.secret_key) demo.secret_key = req.body.secret_key
    if (req.body.sceneName) demo.sceneName = req.body.sceneName
    if (req.body.desc) demo.desc = req.body.desc
    if (req.body.air) demo.air = eval(req.body.air)
    if (req.body.lamp) demo.lamp = eval(req.body.lamp)
    if (req.body.curtain) demo.curtain = eval(req.body.curtain)
    if (req.body.computer) demo.computer = eval(req.body.computer)
    if (req.body.projector) demo.projector = eval(req.body.projector)
    if (req.body.fan) demo.fan = eval(req.body.fan)
    if (req.body.num) demo.num = parseInt(req.body.num)

    Scene.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: demo },
        { new: true }
    ).then(demo => res.json(demo)).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/scenes/add
 * @desc  添加多一间课室有场景控制
 * @access public
 */
router.post('/zengjia', (req, res) => {
    new SceneControl(req.body).save().then(msg => res.json(msg)).catch(err => res.status(404).json(err))
})


/**
 * @router GET api/scenes/getSceneStatus/:secret_key
 * @desc  获取初始状态
 * @access public
 */
router.get('/getSceneStatus/:secret_key', (req, res) => {
    SceneControl.find({ secret_key: req.params.secret_key }).then(scenes => {
        res.json(scenes)
    })
})

/**
 * @router POST api/scenes/search
 * @desc  根据筛选获取数据
 * @access public
 */
router.post('/search', (req, res) => {
    SceneControl.find(req.body).then(scenes => {
        res.json(scenes)
    })
})

/**
 * @router POST api/scenes/send/:id
 * @desc  模仿场景控制
 * @access public
 */
router.post('/send/:id', (req, res) => {
    SceneControl.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body},
        { new: true }
    ).then(msg => res.json(msg)).catch(err => res.status(404).json(err))
})


module.exports = router