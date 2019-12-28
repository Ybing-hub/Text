export const SERVER = 'http://127.0.0.1:3000'
export const UPLOAD_PRODUCT_IMAGE = SERVER + '/products/images'
export const UPLOAD_PRODUCT_DETAIL_IMAGE = SERVER + '/products/detailImages'
export const UPLOAD_AD_IMAGE = SERVER + '/ads/image'

export const API_CONFIG = {
	login: 					['/sessions/users','post'],
	logOut: 				['/sessions/users','delete'],
	getCounts: 				['/counts','get'],
	getPageList: 			['/users/list','get'],
	addCategories: 			['/categories','post'],
	getLevelCategories: 	['/categories/levelCategories','get'],
	getListCategories: 		['/categories/list','get'],
	getNameCategories: 		['/categories/name','put'],
	getMobileNameCategories:['/categories/mobileName','put'],
	getOrderCategories: 	['/categories/order','put'],
	getUpdateIsShowAction: 	['/categories/isShow','put'],
	addProducts: 			['/products','post'],
	getProductList: 		['/products/list','get'],
	updateIsShowProduct: 	['/products/isShow','put'],
	updateStatusProduct: 	['/products/status','put'],
	updateIsHotProduct: 	['/products/isHot','put'],
	updateOrderProduct: 	['/products/order','put'],
	getProductDetail: 		['/products/detail','get'],
	updateProducts: 		['/products','put'],

	//广告APi 
	getAdsList:                  	["/ads/list","get"],
    getAdsDetail:                	["/ads/detail","get"],
    addAds:                      	["/ads","post"],
    updateAds:                  	["/ads","put"],
    updateAdsOrder:              	["/ads/order","put"],
    updateAdsIsShow:             	["/ads/isShow","put"],
}