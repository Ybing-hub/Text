const express = require('express')
const app = express()

app.use(express.static('public'))

app.all('/',(req,res,next)=>{
	console.log('always all soming')
	next()
})

app.get('/',(req,res)=>res.send('get world!!!'))
app.post('/',(req,res)=>res.send('post world!!!'))
app.put('/',(req,res)=>res.send('put world!!!'))
app.delete('/',(req,res)=>res.send('delete world!!!'))

app.listen(3000,()=>console.log('express listen 3000'))