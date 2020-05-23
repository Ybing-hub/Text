const http = require('http');
const path = require('path');
const fs = require('fs');
const mime = require('./mime.json')
const server = http.createServer((req,res)=>{
	console.log(req.url)
	// console.log(req.method)
	// res.write('hello world')
	// res.end('ok')
	const filePath = req.url;

	const filname = path.normalize(__dirname+/static/+filePath)

	fs.readFile(filname,{endocing:'utf-8'},(err,data)=>{
		if (err) {
			res.setHeader('Content-type','text/html;charset="utf-8"');
			res.statusCode = 404;
			res.end('<h1>请求数据错误，请检查后在操作</h1>')
		}else{
			const extname = path.extname(req.url)
			const mimeType = mime[extname];
			res.setHeader('Content-type',mimeType+';charset="utf-8"');
			res.end(data)
		}
	})

})
server.listen(3000,'10.196.7.140',()=>{
	console.log('oj8k')
	console.log('server url is http://10.196.7.140:3000')
})