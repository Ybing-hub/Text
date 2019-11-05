const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const swig = require('swig')
const mime = require('./mime.json')
const { get }  = require('./model/item.js')

const server = http.createServer((req,res)=>{
	// console.log(req.url)
	// console.log(req.method)
	// res.write('hello world')
	// res.end('ok')
	const parse = url.parse(req.url,true)
	const filePath = req.url;
	// console.log(parse)
	const pathname = parse.pathname;
	// console.log(get)
	if (pathname == '/' || pathname == '/index.html') {//
		get()
		.then(data=>{
			console.log(data)
			const filname = path.normalize(__dirname+'/static/index.html')
			var template = swig.compileFile(filname)
			const html = template({
				data:data
			})
			res.setHeader('Content-type','text/html;charset="utf-8"');
			res.end(html)
		})
		.catch(err=>{
			res.setHeader('Content-type','text/html;charset="utf-8"');
			res.statusCode = 404;
			res.end('<h1>请求数据错误，请检查后在操作</h1>')
		})
		/*
		const filname = path.normalize(__dirname+'/static/index.html')
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
		*/
	}else if (pathname == '/add') {//新增
		



		console.log('add...')
		res.end('ok')
	}else if (pathname == 'delete') {//删除

	}else{//静态资源
		const filname = path.normalize(__dirname+'/static/'+filePath)
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
	}
})
server.listen(3000,'10.196.7.140',()=>{
	console.log('oj8k')
	console.log('server url is http://10.196.7.140:3000')
})