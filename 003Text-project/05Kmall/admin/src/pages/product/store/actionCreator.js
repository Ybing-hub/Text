import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'
import {message} from 'antd'

export const getLevelCategories = ()=>{
	return (dispatch,getState)=>{
		api.getLevelCategories({
			level:3
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				dispatch(setCategoriesLevelAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}
//新增商品action
const setMainImageErrAction=()=>({
	type:types.SET_MAIN_IMAGE_ERR
})
const setImagesErrAction=()=>({
	type:types.SET_IMAGES_ERR
})
//处理自定义组件传值到store
export const getMainImageAction = (payload)=>({
	type:types.SET_MAIN_IMAGE,
	payload
})
export const getImagesAction = (payload)=>({
	type:types.SET_IMAGES,
	payload
})
export const getDetailAction = (payload)=>({
	type:types.SET_DETAIL,
	payload
})
//新增商品
export const getProductAddAction = (err,values)=>{
	return (dispatch,getState)=>{
		const state = getState().get('product')
		const mainImage = state.get('mainImage')
		const images = state.get('images')
		const detail = state.get('detail')
		let hasErr = false
		if (err) {
			hasErr = true
		}
		if (!mainImage) {
			hasErr = true
			dispatch(setMainImageErrAction())
		}
		if (!images) {
			hasErr = true
			dispatch(setImagesErrAction())
		}
		if (hasErr) {
			return
		}
		let request = api.addProducts
		if (values.id) {
			request = api.updateProducts
		}
		request({
			...values,
			mainImage:mainImage,
			images:images,
			detail:detail
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success(data.message,()=>{
					window.location.href = '/product'
				})
			}else{
				message.error(data.message)
			}
		})
		.catch(err=>{
			console.log(err)
		}) 	
	}
}
//处理获取最新父级分类数据
const getPageStartAction = ()=>({
	type:types.PAGE_REQEST_START
})
const getPageEndAction = ()=>({
	type:types.PAGE_REQEST_END
})

const setCategoriesLevelAction = (payload)=>({
	type:types.SET_CATEGORY_LEVEL,
	payload
})

//处理获取最新父级分类数据
export const getCategoriesLevelAction = ()=>{
	return (dispatch,getState)=>{
		api.getLevelCategories({
			level:3
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				dispatch(setCategoriesLevelAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}

const getSetPageAction = (payload) =>({
	type:types.SET_PAGE,
	payload
})
//显示分页数据
export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		dispatch(getPageStartAction())
		api.getProductList({
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请重试')
		})
		.finally(()=>{
			dispatch(getPageEndAction())
		})
	}
}
//更新显示隐藏
export const getUpdateIsShowAction = (id,neWIsShow)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateIsShowProduct({
			id:id,
			isShow:neWIsShow,
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('更新显示隐藏成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageEndAction())
		})
	}
}
//更新上/下架
export const getUpdateStatusAction = (id,newStatus)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateStatusProduct({
			id:id,
			status:newStatus,
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('更新上/下架成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageEndAction())
		})
	}
}
//更新是否热卖
export const getUpdateIsHotAction = (id,neWIsHot)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateIsHotProduct({
			id:id,
			isHot:neWIsHot,
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('更新是否热卖成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageEndAction())
		})
	}
}
//排序
export const getUpdateOrderAction = (id,newOrder)=>{
	return (dispatch,getState)=>{
		const page = getState().get('product').get('current')
		api.updateOrderProduct({
			id:id,
			order:newOrder,
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('更新排序成功')
				dispatch(getSetPageAction(data.data))
			}else{
				message.error('请求失败,请重试')
			}
		})
		.catch(err=>{
			console.log(err)
		})
		.finally(()=>{
			dispatch(getPageEndAction())
		})
	}
}

const setProductDetailAction = (payload)=>({
	type:types.SET_PRODUCT_DETAIL,
	payload
})
//编辑商品数据回填
export const getProcuctDetailAction = (id)=>{
	return (dispatch,getState)=>{
		api.getProductDetail({
			id:id
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				dispatch(setProductDetailAction(data.data))
			}else{
				message.error('请求失败,请稍后再试!')
			}
		})
		.catch(err=>{
			console.log(err)
			message.error('请求失败,请稍后再试!')
		})
		.finally(()=>{
			dispatch(getPageEndAction())
		})
	}
}