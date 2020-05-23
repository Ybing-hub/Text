import * as types from './actionTypes.js'
import { fromJS } from 'immutable'
const defaultState = fromJS({
	list:[],
	current:0,
	pageSize:0,
	total:0,
	isFecthing:false,
	categories:[],

	mainImage:'',
	images:'',
	detail:'',

	mainImageValidateStatus:'',
	mainHelp:'',
	imagesValidateStatus:'',
	imagesHelp:'',

	category:'',
	name:'',
	description:'',
	price:'',
	stock:'',
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
	if (action.type == types.SET_CATEGORY_LEVEL) {
		return state.set('categories',fromJS(action.payload))
	}
	if (action.type == types.SET_MAIN_IMAGE) {
		return state.merge({
			mainImage:action.payload,
			imagesValidateStatus:'',
			imagesHelp:''
		})
	}
	if (action.type == types.SET_IMAGES) {
		return state.merge({
			images:action.payload,
			imagesValidateStatus:'',
			imagesHelp:'',
		})
	}
	if (action.type == types.SET_DETAIL) {
		return state.set('detail',action.payload)
	}
	if (action.type == types.SET_MAIN_IMAGE_ERR) {
		return state.merge({
			mainImageValidateStatus:'error',
			mainHelp:'请上传封面图片',
		})
	}
	if (action.type == types.SET_IMAGES_ERR) {
		return state.merge({
			imagesValidateStatus:'error',
			imagesHelp:'请上传商品图片'
		})
	}
	if(action.type == types.SET_PRODUCT_DETAIL){
		return state.merge({
			category:action.payload.category._id,
			name:action.payload.name,
			description:action.payload.description,
			price:action.payload.price,
			stock:action.payload.stock,
			mainImage:action.payload.mainImage,
			images:action.payload.images,
			detail:action.payload.detail,
		})
	}
	return state
}