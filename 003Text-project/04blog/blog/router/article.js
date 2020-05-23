const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const pagination = require('../util/pagination.js')

const multer = require('multer');
const upload = multer({dest:'public/uploads/'});

router.use((req,res,next)=>{
	if (req.userInfo.isAdmin) {
		next()
	}else{
		res.send('<h1>请使用管理员账号登陆</h1>')
	}
})
//显示文章管理首页
router.get('/',(req,res)=>{
	ArticleModel.getPaginationData(req)
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
	/*
	const options = {
		page:req.query.page / 1,
		model:ArticleModel,
		query:{},
		projection:'-__v',
		sort:{_id:1},
		populates:[{ path: 'user', select: 'username' },{ path: 'category', select: 'name' }]
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
	*/
})

//显示文章管理--新增
router.get('/add',(req,res)=>{
	CategoryModel.find({},'name')
	.then(categories=>{
		res.render('admin/article_add_edit',{
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
	let { category,title,intro,content } = req.body
	//2新增数据
	ArticleModel.insertMany({
		category,
		title,
		intro,
		content,
		user:req.userInfo._id
	})
	.then(result=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'新增文章成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'------失败------',
			url:'/article'
		})
	})
})

//处理文章管理--新增--上传图片
router.post('uploadImage',upload.single('upload'),(req,res)=>{
	const filePath = '/uploads/'+req.file.filename
	res.json({
		uploaded:true,
		url:filePath
	})
})



//显示文章管理--编辑
router.get('/edit/:id', (req, res) => {
	const id = req.params.id
	//查找数据库获取对应分类
	CategoryModel.find({})
	.then(categories=>{
		ArticleModel.findById(id)
		.then(article=>{
			res.render('admin/article_add_edit',{
				userInfo:req.userInfo,
				categories,
				article
			})
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'数据库操作失败,请稍后再试!!!'
		})
	})
})

//处理文章管理--编辑
router.post('/edit',(req,res)=>{
	let { category,title,intro,content,id } = req.body
	CategoryModel.updateOne({_id:id},{category,title,intro,content})
	.then(data=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:"更新成功",
			url:"/article"
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:"更新失败"
		})
	})
})

//处理文章管理--删除
router.get('/delete/:id',(req,res)=>{
	const id = req.params.id
	ArticleModel.deleteOne({_id:id})
	.then(category=>{
		res.render('admin/ok',{
			userInfo:req.userInfo,
			message:'删除成功',
			url:'/article'
		})
	})
	.catch(err=>{
		res.render('admin/err',{
			userInfo:req.userInfo,
			message:'删除失败,请稍后再试'
		})
	})
})

module.exports = router