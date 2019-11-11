const EventEmitter = require('events')

class Myemitter extends EventEmitter{

}

const listener1 = ()=>{
	console.log('listener1...')
} 
const listener2 = ()=>{
	console.log('listener2...')
} 
const emitter = new Myemitter();
emitter.on('test',listener1)
emitter.on('test',listener2)

emitter.removeListener('test',listener2)

emitter.emit('test')
/*
emitter.off('test',listener1)
emitter.emit('test')
*/
