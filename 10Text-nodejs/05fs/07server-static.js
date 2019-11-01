const http = require('http')

const server = http.createServer((req,res)=>{
	console.log(res.url)
	const filePath = req.url
	// const fileName = 
	res.end()
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('oj8k')
	console.log('server url is http://127.0.0.1:3000')
})