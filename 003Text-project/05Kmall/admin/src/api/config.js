export const SERVER = 'http://127.0.0.1:3000'

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
}