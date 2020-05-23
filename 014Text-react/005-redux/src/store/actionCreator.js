import { 
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'
import axios from 'axios'

export const getChangeItemAction = (val) =>({
	type:CHANGE_ITEM,
	payload:val
})
export const getAddItemAction = ()=>({
	type:ADD_ITEM
})
export const getDelItemAction = (index)=>({
	type:DEL_ITEM,
	payload:index
})
/*
export const getLoadDataAction = (data)=>({
	type:LOAD_DATA,
	payload:data
})
*/
export const getLoadDataAction = ()=>{
	axios.get('http://127.0.0.1:3000')
	.then(result=>{
		// console.log(result.data)
		return{
			type:LOAD_DATA,
			payload:result.data
		}
	})
	.catch(err=>{
		console.log(err)
	})
}