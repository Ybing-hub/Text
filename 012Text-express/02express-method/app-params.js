const express = require('express')
const app = express()

app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always all soming')
	next()
})

app.get('/',(req,res)=>{
	console.log(req.query)
	res.send('get1 world!!!')
})

app.get('/users/:userId/books/:bookId',(req,res)=>{
	console.log(req.params)
	res.send('get1 world!!!')
})

app.listen(3000,()=>console.log('express listen 3000'))