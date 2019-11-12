const mongoose = require('mongoose')
const UserModel = require('./models/user.js')
//链接数据库
mongoose.connect('mongodb://localhost/it', { useUnifiedTopology: true,useNewUrlParser: true })

const db = mongoose.connection
db.on('error',(err)=>{
	console.log('connect db err ...')
	throw err
})
db.once('open', function() {
  	console.log('connect success !!!')
  	
	//3.根据模型进行数据库操作:CRUD
	//3.1新增
	/*
	UserModel.insertMany([{name:"mary",age:22,major:"Alt"},{name:"kangkang",age:21,major:"Sing"}])
	.then(data =>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
	*/
	
	UserModel.findOne({_id:"5dca6bc9f2af4109e82540e6"})
	.then(data =>{
		// console.log(data)
		console.log(data.createAt.toLocaleString())
		// moment(data.createAt).format('YYYY-MM-DD HH:mm:ss')
	})
	.catch(err=>{
		console.log(err.message)
	})
	
})


