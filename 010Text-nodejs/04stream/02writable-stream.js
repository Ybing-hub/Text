

const { Writable } = require('stream')

class Writable1 extends Writable{
	_write(chunk,encoding,callback){
		console.log('--chunk',chunk)
		console.log('--encoding',encoding)
		console.log('--callback',callback)
		callback()
	}
}
const wrabel = new Writable1()
wrabel.on('finish',()=>{
	console.log('finish done')
})/*
wrabel.write('hellow',()=>{
	console.log('write file done')
})*/
wrabel.end('afsfa')