var fs = require('fs')

const rs = fs.createReadStream('./02hello.txt')
rs.on('finish',()=>{
	console.log('finish done...')
})
rs.write('hello',()=>{
	console.log('write...')
})
rs.end();