const mongoose = require('mongoose')


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
	},
	createAt:{
		type:Date,
		default:Date.now
	}
})
const UserModel = mongoose.model('user', UserSchema)


module.exports = UserModel