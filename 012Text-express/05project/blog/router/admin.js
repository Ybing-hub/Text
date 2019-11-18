const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})

router.get('/',(req,res)=>{
	res.render('admin/index',{
		userInfo:req.userInfo
	})
})

router.get('/user',(req,res)=>{
	const limit = 3
	let page = req.query.page/1

	let skip = (page-1)*limit

	UserModel.find({})
	.skip(skip)
	.limit(limit)
	.then(users=>{
		req.render('admin/user_list',{
			userInfo:req.userInfo,
			users:users
		})
	})
	.catch(err=>{
		console.log(err)
	})
})



module.exports = router