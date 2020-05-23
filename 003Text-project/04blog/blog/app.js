const express = require('express')
const app = express()
const swig = require('swig')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
var Cookies = require('cookies')
const session = require('express-session')
const MongoStore = require("connect-mongo")(session)


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// 配置中间件信息后post的参数会被存在req.body
//链接数据库
mongoose.connect('mongodb://localhost/blog', { useUnifiedTopology: true,useNewUrlParser: true })

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

/*app.use((req,res,next)=>{
	//生成cookies对象并存在req
	req.cookies = new Cookies(req,res)
	let userInfo = {}
	if(req.cookies.get('userInfo')){
		userInfo = JSON.parse(req.cookies.get('userInfo'))
	}
	req.userInfo = userInfo
	next()
})
*/
app.use(session({
    //设置cookie名称
    name:'kzid',
    //用它来对session cookie签名，防止篡改
    secret:'abc',
    //强制保存session即使它并没有变化
    resave: true,
    //强制将未初始化的session存储
    saveUninitialized: true, 
    //如果为true,则每次请求都更新cookie的过期时间
    rolling:true,
    //cookie过期时间 1天
    cookie:{maxAge:1000*60*60*24},
    //设置session存储在数据库中
    store:new MongoStore({ mongooseConnection: mongoose.connection })
}))

app.use((req,res,next)=>{
	//获取并将cookies信息存在req.userInfo上
	req.userInfo = req.session.userInfo || {}

	next()
})

app.use('/',require('./router/index.js'))
app.use('/user',require('./router/user.js'))
app.use('/admin',require('./router/admin.js'))
app.use('/category',require('./router/category.js'))
app.use('/article',require('./router/article.js'))

app.listen(3000,()=>console.log('express listen http://127.0.0.1:3000'))