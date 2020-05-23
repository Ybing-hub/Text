import axios from 'axios'
import * as types from './actionTypes.js'
import api from 'api'

const getPageStartAction = ()=>({
	type:types.PAGE_REQEST_START
})
const getPageEndAction = ()=>({
	type:types.PAGE_REQEST_END
})
const getSetPageAction = (payload) =>({
	type:types.SET_PAGE,
	payload
})

export const getPageAction = (page)=>{
	return (dispatch,getState)=>{
		dispatch(getPageStartAction())
		api.getPageList({
			page:page
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				dispatch(getSetPageAction(data.data))
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
