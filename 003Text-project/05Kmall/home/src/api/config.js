var API_CONFIG = {
	login: 					['/sessions/users','post'],
	getUsername: 			['/sessions/username','get'],
	logout: 				['/sessions/user','get'],
	register: 				['/users','post'],
	checkUsername: 			['/users/checkUsername','get'],
	getUsernames: 			['/sessions/users','get'],
	updatepswd: 			['/users','put'],
	getCategories: 			['/categories/homeCategories','get'],
	getHomeAds: 			['/ads/positionAds','get'],
	getFloors: 				['/floors','get'],
	getProductsList: 		['/products/list','get'],
	getProductsDetail: 		['/products/detail','get'],
	getCarts: 				['/carts','get'],
}

module.exports = {
	API_CONFIG
}

