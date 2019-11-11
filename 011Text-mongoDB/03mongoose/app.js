const mongoose = require('mongoose')
// const moment = require('moment')
// const UserModel = require('./models/user.js')
// const BlogModel = require('./models/blog.js')
//链接数据库
// mongoose.connect('mongodb://localhost/kuazhu', {useNewUrlParser: true})
mongoose.connect('mongodb://localhost/kuazhu', { useUnifiedTopology: true,useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(err)=>{
	console.log('connect error')
})
db.once('open',function(){
	console.log('connect success')
})