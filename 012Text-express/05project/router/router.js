const express = require('express')
const app = express()

app.use(express.static('public'))

app.all('',(req,res,next)=>{
	console.log('always all soming')
	next()
})

router.get('/',(req,res)=>res.send('get world!!!'))
router.post('/',(req,res)=>res.send('post world!!!'))
router.put('/',(req,res)=>res.send('put world!!!'))
router.delete('/',(req,res)=>res.send('delete world!!!'))

app.listen(3000,()=>console.log('express listen 3000'))