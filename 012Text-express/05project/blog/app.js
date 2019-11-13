const express = require('express')
const app = express()
const swig = require('swig')
const mongoose = require('mongoose')


//链接数据库
mongoose.connect('mongodb://localhost/it', { useUnifiedTopology: true,useNewUrlParser: true })

const db = mongoose.connection
db.on('error',(err)=>{
	console.log('connect db err ...')
	throw err
})
db.once('open', function() {
  	console.log('connect success !!!')
})

app.use(express.static('public'))
//开发阶段设置不走缓存
swig.setDefaults({
  cache: false
})
//配置应用模板
app.engine('html', swig.renderFile);
//配置模板的存放目录
app.set('views', './views')
//注册模板引擎
app.set('view engine', 'html')

app.use('/',require('./router/index.js'))

app.listen(3000,()=>console.log('express listen http://127.0.0.1:3000'))