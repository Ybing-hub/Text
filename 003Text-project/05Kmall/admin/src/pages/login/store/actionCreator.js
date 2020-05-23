import * as types from './actionTypes.js'
import {message} from 'antd'
import { saveUsername } from 'util'
import axios from 'axios'
import api from 'api'

const getLoginStartAction = ()=>({
	type:types.LOGIN_REQEST_START
})
const getLoginEndAction = ()=>({
	type:types.LOGIN_REQEST_END
})

export const getLoginAction = (values)=>{
	return (dispatch,getState)=>{
		dispatch(getLoginStartAction())
		values.role = 'admin'
		api.login(values)
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				saveUsername(data.data.username)
				
				window.location.href = '/'
			}
		})
		.catch(err=>{
			message.err(data.message)
		})
		.finally(()=>{
			dispatch(getLoginEndAction())
		})
		/*
		axios({
			method:'post',
			url:'http://127.0.0.1:3000/sessions/users',
			withCredentials:true,
			data:values
		})
		.then(result=>{
			const data = result.data
			if (data.code == 0) {
				saveUsername(data.data.username)

				window.location.href = '/'
			}
		})
		.catch(err=>{
			message.err(data.message)
		})
		.finally(()=>{
			dispatch(getLoginEndAction())
		})
		*/
	}
}
