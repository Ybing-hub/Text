const express = require('express')
const router = express.Router()
const CategoryModel = require('../models/category.js')
const ArticleModel = require('../models/article.js')
const pagination = require('../util/pagination.js')
//处理首页加载
async function getCommonDate(){
	//导航加载
	const getCategoriesDatePromise = CategoryModel.find({},'name').sort({order:1})
	const categories = await getCategoriesDatePromise
	//排行榜
	const getTopArticleDatePromise = ArticleModel.find({},'title click').sort({click:-1}).limit(10)
	const topArticles = getTopArticleDatePromise
	return{
		categories,
		topArticles
	}
}



router.get('/',(req,res)=>{
	ArticleModel.getPaginationData(req)
	.then(result=>{
		getCommonDate()
		.then(data=>{
			const { categories,topArticles } = data
			res.render('main/index',{
				userInfo:req.userInfo,
				categories,
				topArticles,
				//返回分页数据
				articles:result.docs,
				page:result.page,
				list:result.list,
				pages:result.pages,
				url:'/'
			})
		})
	})
})
router.get('/list',(req,res)=>{
	res.render('main/list',{
		userInfo:req.userInfo
	})
})
router.get('/detail',(req,res)=>{
	res.render('main/detail',{
		userInfo:req.userInfo
	})
})

module.exports = router