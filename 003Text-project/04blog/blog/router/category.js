const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const pagination = require('../util/pagination.js')

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})
//显示分类管理首页
router.get('/',(req,res)=>{
	const options = {
		page:req.query.page / 1,
		model:CategoryModel,
		query:{},
		projection:'-__v',
		sort:{order:1}
	}
	pagination(options)
	.then(result=>{
		res.render('admin/category_list',{
			userInfo:req.userInfo,
			categories:result.docs,
			page:result.page,
			list:result.list,
			pages:result.pages,
			url:'/category'
		})
	})
	.catch(err=>{
		console.log(err)
	})
})
//显示分类管理--新增
router.get('/add',(req,res)=>{
	res.render('admin/category_add_edit',{
		userInfo:req.userInfo
	})
})
//处理分类管理--新增
router.post('/add',(req,res)=>{
	//1获取参数
	let { name,order } = req.body
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

//显示分类管理--编辑
router.get('/edit/:id',(req,res)=>{
	const id = req.params.id
	CategoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_add_edit'),{
			userInfo:req.userInfo,
			category
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'失败'
		})
	})
})

//处理分类管理--修改
router.post('/edit',(req,res)=>{
	//1获取参数
	let { name,order,id } = req.body
	//2根据ID查找
	CategoryModel.findById(id)
	.then(category=>{
		if (category.name == name && category.order == order) {
			res.render('admin/err',{
				userInfo:req.userInfo,
				message:'数据无更新,请更改后再操作'
			})
		}else{
			CategoryModel.findOne({name:name,_id:{$ne:id}})
			.then(category=>{
				if (category) {
					res.render('admin/err',{
						userInfo:req.userInfo,
						message:'该名称已存在,请更改后再操作'
					})
				}else{
					CategoryModel.updateOne({_id:id},{name,order})
					.then(data=>{
						res.render('admin/ok',{
							userInfo:req.userInfo,
							message:'修改成功',
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
					message:'数据库操作失败'
				})
			})
		}
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试'
		})
	})
})


//处理分类管理--删除
router.get('/delete/:id',(req,res)=>{
	const id = req.params.id
	CategoryModel.deleteOne({_id:id})
	.then(category=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'删除成功',
			url:'/category'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'删除失败,请稍后再试',
			url:'/category'
		})
	})
})
module.exports = router