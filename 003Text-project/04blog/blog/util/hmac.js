const crypto = require('crypto')

module.exports=(str)=>{
	const hmac = crypto.createHmac('sha512','YB')
	//加密数据
	hmac.update(str)
	//生成加密后的数据
	return hmac.digest('hex')
}