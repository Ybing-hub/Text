const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/it', { useUnifiedTopology: true,useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(err)=>{
	console.log('connect error')
})
db.once('open',function(){
	console.log('connect success')
	const UserSchema = new mongoose.Schema({
		name:{
			type:String,
			minlength:[3,'name不得少于3个字符'],
			maxlength:[8,'name不得超过8个字符']
		},
		age:{
			type:Number,
			min:[18,'最小年龄不得低于18岁'],
			max:[60,'最大年龄不得超过60岁']
		},
		major:{
			type:String
		},
		phone:{
			type:Number,
			validate:{
				validator:(val)=>{
					return /1[35789]\d{9}/.test()
				},
				message:'电话号码不合法'
			}
		}
		/*,
		Auther{
			type:mongoose.Schema.Types.ObjectId
		}*/
		/*
		UserSchema.model = getById('',(err,dosc)=>{
			if (err) {
				console.log(err.message)
			}else{
				console.log(dosc)
			}
		})
		*/
	})
	const UserModel = mongoose.model('user',UserSchema)
	//1增
	/*1.1
	const user = new UserModel({name:"lisi",age:28})
	user.save()
	.then(data =>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
	*/
	//1.2一下全部插入数据insertMany
	
	UserModel.insertMany([{name:"anmy",age:22,major:"computer"},{name:"peter",age:29,major:"sport"}],(err,dosc)=>{
		if (err) {
			console.log('find err',err.message)
		}else{
			console.log(dosc)
		}
	})
	
	//1.3一个一个插入数据create
	/*
	UserModel.create({name:"peter",age:18,major:"ball"})
	.then(data =>{
		console.log(data)
	})
	.catch(err=>{
		console.log(err.message)
	})
	*/
	//查找
	/*
	UserModel.find({age:21},'name age -_id',(err,dosc)=>{
		if (err) {
			console.log('find err',err.message)
		}else{
			console.log(dosc)
		}
	})
	*/
	//修改
	/*
	UserModel.update({name:"zhangsan"},{$set:{age:18}},(err,dosc)=>{
		if (err) {
			console.log('update err',err.message)
		}else{
			console.log(dosc)
		}
	})
	*/
	//删除
	/*
	UserModel.deleteOne({name:"zhangsan"},(err,dosc)=>{
		if (err) {
			console.log('reomve err',err.message)
		}else{
			console.log(dosc)
		}
	})
	*/
})

