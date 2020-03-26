const express = require("express")
const router = express.Router()
const EquipData = require("../../../models/EquipData")
const EleData = require("../../../models/EleData")
const EnvironData = require("../../../models/EnvironData")
const passport = require("passport")
/**
 * @router GET api/analysis/test
 * @desc   返回请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
  res.json({ msg: 'ok' })
})
/**
 * @router post api/analysis/init
 * @desc 获取所有教学楼课室的设备状态信息
 * @access private
 */
router.post('/init', passport.authenticate('jwt', { session: false }), (req, res) => {
  EquipData.find(req.body).then(data => {
    if (!data) {
      res.status(404).json('没有任何数据')
    }
    res.json(data)
  }).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/analysis/add
 * @desc  增加所有教学楼课室的设备状态信息
 * @access public
 */
router.post('/add', (req, res) => {
  const demo = {}
  const d = new Date();
  const YYYY = d.getFullYear();
  const MM = d.getMonth() + 1;
  const DD = d.getDate();
  demo.date = YYYY + "-" + MM + "-" + DD;
  if (req.body.secret_key) demo.secret_key = req.body.secret_key
  if (req.body.msg) demo.msg = req.body.msg
  if (req.body.equip) demo.equip = req.body.equip
  if (req.body.errNum) demo.errNum = req.body.errNum
  new EquipData(demo).save().then(demo => {
    res.json(demo)
  })
})

/**
 * @router post api/analysis/init1
 * @desc 获取所有教学楼课室的用电量
 * @access private
 */
router.post('/init1', passport.authenticate('jwt', { session: false }), (req, res) => {
  EleData.find(req.body).then(data => {
    if (!data) {
      res.status(404).json('没有任何数据')
    }
    res.json(data)
  }).catch(err => res.status(404).json(err))
})


/**
 * @router POST api/analysis/add1
 * @desc  增加所有教学楼课室的用电量
 * @access public
 */
router.post('/add1', (req, res) => {
  const demo = {}
  const d = new Date();
  const YYYY = d.getFullYear();
  const MM = d.getMonth() + 1;
  const DD = d.getDate();
  demo.date = YYYY + "-" + MM + "-" + DD;
  if (req.body.secret_key) demo.secret_key = req.body.secret_key
  if (req.body.msg) demo.msg = req.body.msg
  if (req.body.electricity) demo.electricity = req.body.electricity

  new EleData(demo).save().then(demo => {
    res.json(demo)
  })
})

/**
 * @router post api/analysis/init2
 * @desc 获取所有环境监控数据
 * @access private
 */
router.post('/init2', passport.authenticate('jwt', { session: false }), (req, res) => {
  EnvironData.find(req.body).then(data => {
    if (!data) {
      res.status(404).json('没有任何数据')
    }
    res.json(data)
  }).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/analysis/add2
 * @desc  增加所有环境监控数据
 * @access public
 */
router.post('/add2', (req, res) => {
  const demo = {}
  const d = new Date();
  const YYYY = d.getFullYear();
  const MM = d.getMonth() + 1;
  const DD = d.getDate();
  demo.date = YYYY + "-" + MM + "-" + DD;
  if (req.body.secret_key) demo.secret_key = req.body.secret_key
  if (req.body.msg) demo.msg = req.body.msg
  if (req.body.environ) demo.environ = req.body.environ
  if (req.body.tableData) demo.tableData = req.body.tableData

  new EnvironData(demo).save().then(demo => {
    res.json(demo)
  })
})

module.exports = router