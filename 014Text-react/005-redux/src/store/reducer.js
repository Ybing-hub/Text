import { immutable } from 'redux-immutable'

const defaultStore ={
	list:['吃饭','烤串','扎啤'],
	task:''
}
import { 
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'

export default (state=defaultStore,action)=>{
	if (action.type == CHANGE_ITEM) {
		//错误写法-->修改原数据
		// state.task = action.payload
		const newState = JSON.parse(JSON.stringify(state))
		newState.task = action.payload

		return newState
	}
	if (action.type == ADD_ITEM) {
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.push(newState.task)
		newState.task = ''
		return newState
	}
	if (action.type == DEL_ITEM) {
		const newState = JSON.parse(JSON.stringify(state))
		newState.list.splice(newState.payload,1)
		return newState
	}
	if (action.type == LOAD_DATA) {
		const newState = JSON.parse(JSON.stringify(state))
		newState.list = action.payload
		return newState
	}
	return state
}