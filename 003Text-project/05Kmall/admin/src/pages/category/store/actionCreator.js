import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'
import {message} from 'antd'

//新增分类
export const getCategoriesAddAction = (values)=>{
	return (dispatch,getState)=>{
		api.addCategories(values)
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('新增分类成功')
				dispatch(setLevelCategoriesAction(data.data))
				window.location.href = '/category'
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
		api.getListCategories({
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
//更新分类名字
export const getUpdateNameAction = (id,newName)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.getNameCategories({
			id:id,
			name:newName,
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('更新分类名字成功')
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

//更新手机端名称
export const getUpdateMobileNameAction = (id,newMobileName)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.getMobileNameCategories({
			id:id,
			mobileName:newMobileName,
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				message.success('更新分类名字成功')
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
		const page = getState().get('category').get('current')
		api.getOrderCategories({
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
//更新显示隐藏
export const getUpdateIsShowAction = (id,neWIsShow)=>{
	return (dispatch,getState)=>{
		const page = getState().get('category').get('current')
		api.getUpdateIsShowAction({
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