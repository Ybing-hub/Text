import {
	CHANGE_ITEM,
	ADD_ITEM,
	DEL_ITEM,
	LOAD_DATA
} from './actionTypes.js'

function getChangeItemAction(){
	type:ADD_ITEM,
	payload:val
}
function getAddItemAction(){
	type:ADD_ITEM
}
function getDelItemAction((index)=>{
	type:DEL_ITEM,
	payload:index
})
function getLoadDataAction(){
	type:LOAD_DATA
}