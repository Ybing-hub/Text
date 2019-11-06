const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');
const swig = require('swig')
const mime = require('./mime.json')
const querystring = require('querystring')
const { get,add,del }  = require('./model/item.js')

const server = http.createServer((req,res)=>{
	const parse = url.parse(req.url,true)
	const filePath = req.url;
	const pathname = parse.pathname;
	if (pathname == '/' || pathname == '/index.html') {//
		get()
		.then(data=>{
			// console.log(data)
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
	}else if(pathname == '/add'){//新增
		let body = '';
		req.on('data',(chunk)=>{
			body += chunk
		})
		req.on('end',()=>{
			const query = querystring.parse(body)
			add(query.things)
			.then(data=>{
				res.end(JSON.stringify({
					code:0,
					message:"数据添加成功",
					data:data
				}))
			})
			.catch(err=>{
				res.end(JSON.stringify({
					code:1,
					message:"数据添加失败",
					data:err
				}))
			})
		})
	}else if(pathname == '/delete') {//删除
		const id = parse.query.id
		del(id)
		.then(id=>{
			res.end(JSON.stringify({
				code:0,
				message:"数据删除成功"
			}))
		})
		.catch(err =>{
			res.end(JSON.stringify({
				code:1,
				message:"数据删除失败"
			}))
		})
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
server.listen(3000,'127.0.0.1',()=>{
	console.log('oj8k')
	console.log('server url is http://127.0.0.1:3000')
})