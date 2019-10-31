
const { Readable } = require('stream')

class Readable1 extends Readable{
	constructor{
		super();
		this.index = 0;
	}
	_read(){

	}
}
const read = new Readable1()