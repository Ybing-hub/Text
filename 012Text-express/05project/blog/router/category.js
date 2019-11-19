const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})
//显示分类列表首页
router.get('/',(req,res)=>{
	res.render('admin/category_list',{
		userInfo:req.userInfo
	})
})
//显示分类列表--新增
router.get('/add',(req,res)=>{
	res.render('admin/category_add',{
		userInfo:req.userInfo
	})
})
//处理分类列表--新增
router.post('/add',(req,res)=>{
	//1获取参数
	const { name,order } = req.body
	if (!order) {
		order = 0
	}
	// console.log(name,order)
	//2查找同名验证
	CategoryModel.findOne({name:name})
	.then(category=>{
		if (category) {
			res.render('admin/err',{
					userInfo:req.userInfo,
					message:'分类名称已存在，添加失败'
				})
		}else{//3插入数据
			CategoryModel.insertMany({name,order})
			.then(result=>{
				res.render('admin/ok',{
					userInfo:req.userInfo,
					message:'新增成功',
					url:'/category'
				})
			})
			.catch(err=>{
				res.render('admin/err',{
					userInfo:req.userInfo,
					message:'失败'
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
})


module.exports = router