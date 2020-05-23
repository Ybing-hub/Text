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
	
	UserModel.distinct('age',(err,dosc)=>{
		if (err) {
			console.log(err.message)
		}else{
			console.log(dosc.sort())
		}
	})
})

