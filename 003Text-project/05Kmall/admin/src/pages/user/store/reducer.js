import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	list:[],
	usernum:0,
	ordernum:0,
	productnum:0,
	current:0,
	pageSize:0,
	total:0,
	isFecthing:false
})
export default (state=defaultState,action)=>{
	if(action.type == types.SET_PAGE){
		return state.merge({
			list:fromJS(action.payload.list),
			current:action.payload.current,
			pageSize:action.payload.pageSize,
			total:action.payload.total,
			isFecthing:action.payload.isFecthing
		})
	}
	if(action.type == types.PAGE_REQEST_START){
		return state.set('isFecthing',true)
	}
	if(action.type == types.PAGE_REQEST_END){
		return state.set('isFecthing',false)
	}
	return state
}