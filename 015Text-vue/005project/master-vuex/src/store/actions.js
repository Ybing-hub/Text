import {ADD_TODO,DEL_TODO} from './types.js'
export default{
	[ADD_TODO](store,todo){
		store.commit(ADD_TODO,todo)
	},
	[DEL_TODO](store,index){
		store.commit(DEL_TODO,index)
	}
}