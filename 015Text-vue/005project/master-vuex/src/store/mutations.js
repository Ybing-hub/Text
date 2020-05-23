import {ADD_TODO,DEL_TODO,SET_ALL_DONE,DEL_SEL_DONE} from './types.js'
export default{
	[ADD_TODO](state,payload){
		state.todos.unshift(payload)
	},
	[DEL_TODO](state,index){
		state.todos.splice(DEL_TODO,1)
	},
	[SET_ALL_DONE](state,value){
		state.todos.forEach((item)=>{
            item.done = value
        })
	},
	[DEL_SEL_DONE](state){
		state.todos = state.todos.filter((item)=>item.done != true)
	}
}