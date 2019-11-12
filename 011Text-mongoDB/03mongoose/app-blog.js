const mongoose = require('mongoose')
const BlogModel = require('./models/blog.js')
//链接数据库
mongoose.connect('mongodb://localhost/it', { useUnifiedTopology: true,useNewUrlParser: true })

const db = mongoose.connection
db.on('error',(err)=>{
	console.log('connect db err ...')
	throw err
})
db.once('open', function() {
  	console.log('connect success !!!')

	BlogModel.findOne({_id:"5dca6bc9f2af4109e82540e6"})
	.then(data =>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
	
})


