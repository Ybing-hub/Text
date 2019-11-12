const express = require('express')
const app = express()
const bodyParser = require('body-parser')



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))
app.use('/',(req,res)=>{
	console.log(req.body)
})


app.listen(3000,()=>console.log('express listen 3000'))