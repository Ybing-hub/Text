const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')
const hmac = require('../util/hmac.js')

//注册处理
router.post('/register',(req,res)=>{
	//1获取参数
	const { username,password } = req.body	
	UserModel.findOne({username:username})
	.then(user=>{
		if(user) {
			res.json({
				code:0,
				message:'该用户名已存在'
			})
		}else{
			UserModel.insertMany({
				username:username,
				password:hmac(password),
				isAdmin:false
			})
			.then(result=>{
				res.json({
					code:1,
					message:'注册成功',
					user:result
				})
			})
			.catch(err=>{
				res.json({
					code:0,
					message:'数据库出现异常,稍后再试'
				})
			})
		}
	})
	.catch(err=>{
		res.json({
			code:0,
			message:'数据库出现异常,稍后再试'
		})
	})
})

//登陆处理
router.post('/login',(req,res)=>{
	//1获取参数
	const { username,password } = req.body	
	UserModel.findOne({username:username,password:hmac(password)},'-password')
	.then(user=>{
		if(user) {
			req.session.userInfo = user
			console.log(req.session.userInfo)
			res.json({
				code:1,
				message:'登录成功',
				user:user
			})
		}else{
			res.json({
				code:0,
				message:'用户名或密码不正确'
			})
		}
	})
	.catch(err=>{
		res.json({
			code:0,
			message:'数据库出现异常,稍后再试'
		})
	})
})
//退出登录
router.get('/logout',(req,res)=>{
	req.session.destroy()
	res.json({
		code:1,
		message:'退出成功'
	})
})
module.exports = router