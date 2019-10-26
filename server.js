const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const app = express()

//引入路由文件
const users = require('./routes/api/users.js')
const equips = require('./routes/api/epuip/equips')
const buildings = require('./routes/api/place/buildings')
const factorys = require('./routes/api/place/others')
const scenes = require('./routes/api/scene/scenes')
// const excel = require('./routes/api/downExcel')//已经弃用


//数据库连接
const db = require('./config/keys') //基础配置
// mongoose.set('useFindAndModify', true);
mongoose.connect(db.mongodbURL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('mongodb connected'))
    .catch(error => console.log(error))

//使用body-parser中间件，获取post请求数据
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get('/', (req, res) => {
//     res.send('hello world!!')
// })

//passport 初始化
app.use(passport.initialize());

require('./config/passport')(passport)

//路由挂载 将来以api/xx来请求数据
app.use('/api/users', users)
app.use('/api/equips', equips)
app.use('/api/place', buildings)
app.use('/api/others', factorys)
app.use('/api/scenes', scenes)
// app.use('/api/excel', excel) //已经弃用

app.listen(5001, () => {
    console.log('server is running on 5001...')
})