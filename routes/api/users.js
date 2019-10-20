
const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const passport = require('passport');
const User = require('../../models/User')
/**
 * @router GET api/users/test
 * @desc 测试请求的json数据
 * @access public
 */
router.get('/test', (req, res) => {
    res.json({ msg: 'test success' })
})

/**
 * @router GET api/users
 * @desc 获取所有用户信息
 * @access Private
 */
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.find().then(users => {
        if (!users) {
            return res.status(404).json('没有任何用户！')
        }
        res.json(users)
    }).catch(err => res.status(404).json(err))
})

/**
 * @router POST api/users/register
 * @desc 激活账号请求的json数据
 * @access public
 */
router.post('/register', (req, res) => {
    // console.log(req.body)
    User.findOne(
        { email: req.body.email }
    ).then(user => {
        if (user) {
            return res.status(404).json('该用户已存在，请立即登录!')
        } else {
            User.findOne({ secret_key: req.body.secret_key }).then(key => {
                if (!key) {
                    return res.status(404).json('通行证不正确，请联系管理员！')
                } else {
                    const avatar = gravatar.url(req.body.email, {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    })
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        avatar,
                        password: req.body.password,
                        secret_key: req.body.secret_key,
                        identity: req.body.identity,
                    })
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err

                            newUser.password = hash

                            newUser
                                .save()
                                .then(user => res.json(user))
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
        }
    })
})

/**
 * @router POST api/users/login
 * @desc 登录请求的json数据
 * @access public
 */
router.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    User.findOne({ email }).then(user => {
        if (!user) {
            return res.status(404).json('该用户不存在,请注册！')
        }
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const rule = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    identity: user.identity,
                    secret_key: user.secret_key
                }
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({
                        success: true,
                        token: 'Bearer ' + token
                    })
                })
            } else {
                return res.status(404).json('密码错误')
            }
        })
    })
})

/**
 * @router POST api/users/add
 * @desc 创建密钥请求的json数据
 * @access Private
 */
router.post('/add', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = {}

    if (req.body.name) user.name = req.body.name
    if (req.body.identity) user.identity = req.body.identity
    if (req.body.secret_key) user.secret_key = req.body.secret_key
    if (req.body.password) user.password = req.body.password
    new User(user).save().then(user => {
        res.json(user)
    })
})

/**
 * @router POST api/users/deltel/:id
 * @desc 注销账号请求的json数据
 * @access Private
 */
router.post('/delete/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.params.id)
    User.findByIdAndDelete({ _id: req.params.id }).then(user => {
        User.save().then(user => res.json(user))
    }).catch((err) => res.json('账号注销成功！'))
})

/**
 * @router POST api/users/edit/:id
 * @desc 更新用户信息请求的json数据
 * @access Private
 */
router.post('/edit/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const user = {}
    if (req.body.name) user.name = req.body.name
    if (req.body.password) user.password = req.body.password
    if (req.body.gender) user.gender = req.body.gender

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err

            user.password = hash

            // user
            //     .save()
            //     .then(user => res.json(user))
            //     .catch(err => console.log(err))
            User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: user },
                { new: true }
            ).then(user => res.json(user))
        })
    })

    
})

module.exports = router