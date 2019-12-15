import * as types  from './actionTypes.js'
import { fromJS } from 'immutable'

const defaultState = fromJS({
	isFecthing:false
})
export default (state=defaultState,action)=>{
	if(action.type == types.LOGIN_REQEST_START){
		return state.set('isFecthing',true)
	}
	if(action.type == types.LOGIN_REQEST_END){
		return state.set('isFecthing',false)
	}
	return state
}