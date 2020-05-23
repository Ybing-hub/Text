const express = require('express')
const router = express.Router()
const UserModel = require('../models/user.js')
const pagination = require('../util/pagination.js')

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

router.get('/users',(req,res)=>{
	
	const options = {
		page:req.query.page / 1,
		model:UserModel,
		query:{},
		projection:'-password -__v',
		sort:{_id:-1}
	}
	pagination(options)
	.then(result=>{
		res.render('admin/user_list',{
			userInfo:req.userInfo,
			users:result.docs,
			page:result.page,
			list:result.list,
			pages:result.pages,
			url:'/admin/users'
		})
	})
	.catch(err=>{
		console.log(err)
	})
	/*
	const limit = 3
	let page = req.query.page / 1
	
	if (isNaN(page)) {
		page = 1
	}
	if (page == 0) {
		page = 1
	}
	UserModel.countDocuments((err,count)=>{
		// console.log(count)
		let pages = Math.ceil(count / limit)
		if (page > pages) {
			page = pages
		}
		let skip = (page-1)*limit
		let list = []
		for(let i = 1;i<=pages;i++){
			list.push(i)
		}
		UserModel.find({},'-password -__v')
		.sort({_id:-1})
		.skip(skip)
		.limit(limit)
		.then(users=>{
			res.render('admin/user_list',{
				userInfo:req.userInfo,
				users:users,
				page:page,
				list:list,
				pages:pages
			})
		})
		.catch(err=>{
			console.log(err)
		})
	})
	*/
})

module.exports = router