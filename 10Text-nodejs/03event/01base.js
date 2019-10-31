const EventEmitter = require('events')
/*
const emitter = new EventEmitter()
emitter.on('test',()=>{
	console.log('test...')
})
emitter.emit('test')
*/
class Myemitter extends EventEmitter{

}
const emitter = new Myemitter();
emitter.on('test',()=>{
	console.log('mytest...')
})
emitter.on('test',(arg1,arg2)=>{
	console.log('test...')
	console.log(arg1,arg2)
})
const arr = [54,21]
emitter.emit('test')
	
emitter.emit('test',...arr)
