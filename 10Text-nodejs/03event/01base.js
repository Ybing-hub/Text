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
emitter.emit('test')