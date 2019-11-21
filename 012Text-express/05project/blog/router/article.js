const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const pagination = require('../util/pagination.js')

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})
//显示文章管理首页
router.get('/',(req,res)=>{
	const options = {
		page:req.query.page / 1,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:1}
	}
	pagination(options)
	.then(result=>{
		res.render('admin/article_list',{
			userInfo:req.userInfo,
			articles:result.docs,
			page:result.page,
			list:result.list,
			pages:result.pages,
			url:'/article'
		})
	})
	.catch(err=>{
		console.log(err)
	})
})

//显示文章管理--新增
router.get('/add',(req,res)=>{
	CategoryModel.find({},'name')
	.then(categories=>{
		res.render('admin/article_add',{
			userInfo:req.userInfo,
			categories
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"失败"
		})
	})
	
})


//处理文章管理--新增
router.post('/add',(req,res)=>{
	//1获取参数
	let { name,order,id } = req.body
	if (!order) {
		order = 0
	}
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
					categories:categories,
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
/*
//显示分类管理--编辑
router.get('/edit/:id',(req,res)=>{
	const id = req.params.id
	CategoryModel.findById(id)
	.then(category=>{
		res.render('admin/category_edit'),{
			userInfo:req.userInfo
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
							url:'/category',
							category
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
router.post('/delete/:id',(req,res)=>{
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
			message:'删除失败,请稍后再试'
		})
	})
})
*/
module.exports = router