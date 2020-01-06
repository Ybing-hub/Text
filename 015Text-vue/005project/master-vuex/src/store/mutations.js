import {ADD_TODO,DEL_TODO} from './types.js'
export default{
	[ADD_TODO](state,payload){
		state.todos.unshift(payload)
	},
	[DEL_TODO](state,index){
		state.todos.splice(DEL_TODO,1)
	}
}