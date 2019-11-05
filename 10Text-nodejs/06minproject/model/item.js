const fs = require('fs')
const path = require('path')
const util = require('util')
const filepath = path.normalize(__dirname+'/../data/item.json')
const readFile = util.promisify(fs.readFile)
async function get(){
	const data = await readFile(filepath,{flag:'r',encoding:"utf-8"})
	// console.log(data)
	const arr = JSON.parse(data)
	// console.log(data)
	return arr;
}
module.exports = {
	get
}