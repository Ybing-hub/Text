const http = require('http')

const server = http.createServer((req,res)=>{
	console.log(res.url)
	console.log(res.method)
	res.write('hello world')
	res.end()
})
server.listen(3000,'10.196.7.140',()=>{
	console.log('oj8k')
	console.log('server url is http://10.196.7.140:3000')
})