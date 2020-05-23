
const { Readable } = require('stream')

class Readable1 extends Readable{
	constructor(){
		super();
		this.index = 0;
	}
	_read(){
		this.index ++;
		if (this.index < 5) {
			this.push(this.index+'')
		}else{
			this.push(null)
		}
	}
}
const read = new Readable1()
/*
let body = ''
read.on('data',(chunk)=>{
	// console.log(chunk)
	body +=chunk 
})
read.on('end',()=>{
	console.log(body)
})
*/
read.pipe(process.stdout)