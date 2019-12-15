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
				dispatch(setLevelCategoriesAction(data.data))
			}
		})
		.catch(err=>{
			message.err(data.message)
		}) 	
	}
}
//
const setCategoriesLevelAction = (payload)=>({
	type:types.SET_CATEGORY_LEVEL,
	payload
})
export const getCategoriesLevelAction = ()=>{
	return (dispatch,getState)=>{
		api.getLevelCategories({
			level:2
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				dispatch(setCategoriesLevelAction(data.data))
			}else{
				message.err(data.message)
			}
		})
		.catch(err=>{
			console.log(err)
		})
	}
}