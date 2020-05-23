const http = require('http')

const server = http.createServer((req,res)=>{
	res.setHeader('Access-Control-Allow-Origin',"*")
	res.end(JSON.stringify(['AAA','BBB','CCC']))
})
server.listen(3000,'127.0.0.1',()=>{
	console.log('server is http://127.0.0.1:3000')
})