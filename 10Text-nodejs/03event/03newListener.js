const EventEmitter = require('events')

class Myemitter extends EventEmitter{

}
/*
const listener1 = ()=>{
	console.log('success function...')
} 
*/
const emitter = new Myemitter();

emitter.on('newListener',(eventName,callback)=>{
	console.log('success function...')
	console.log(eventName)
	console.log(callback)
})

emitter.on('show',()=>{
	console.log('show...')
})
// emitter.emit('newListener')
/*
emitter.off('test',listener1)
emitter.emit('test')
*/
