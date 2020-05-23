import {ADD_TODO,DEL_TODO,SET_ALL_DONE,DEL_SEL_DONE} from './types.js'
export default{
	[ADD_TODO](store,todo){
		store.commit(ADD_TODO,todo)
	},
	[DEL_TODO](store,index){
		store.commit(DEL_TODO,index)
	},
	[SET_ALL_DONE](store,value){
		store.commit(SET_ALL_DONE,value)
	},
	[DEL_SEL_DONE](store){
		store.commit(DEL_SEL_DONE)
	}
}