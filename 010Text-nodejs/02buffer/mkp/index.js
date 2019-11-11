// console.log(process.argv[2])
var fs  = require('fs')
var fileName = process.argv[2]
fs.mkdirSync('./'+fileName)
fs.mkdirSync('./'+fileName+'/css')
fs.mkdirSync('./'+fileName+'/js')
fs.mkdirSync('./'+fileName+'/imgs')