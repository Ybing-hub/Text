// import { combineReducers } from 'redux'
import {combineReducers} from 'redux-immutable'
import {reducer as loginReducer} from 'pages/login/store'
import {reducer as homeReducer} from 'pages/home/store'
import {reducer as UserReducer} from 'pages/user/store'
import {reducer as categoryReducer} from 'pages/category/store'

export default combineReducers({
	login:loginReducer,
	home:homeReducer,
	user:UserReducer,
	category:categoryReducer
})