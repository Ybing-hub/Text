const fs = require('fs')
const path = require('path')
const util = require('util')
const filepath = path.normalize(__dirname+'/../data/item.json')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
async function get(){
	const data = await readFile(filepath,{flag:'r',encoding:"utf-8"})
	// console.log(data)
	const arr = JSON.parse(data)
	// console.log(data)
	return arr;
}
async function add(things){
	// console.log(things)
	const data = await readFile(filepath,{flag:'r',encoding:"utf-8"})
	const arr = JSON.parse(data)
	const obj = {
		id:Date.now().toString(),
		things:things
	}
	arr.push(obj)
	await writeFile(filepath,JSON.stringify(arr))
	return obj
}
async function del(id){
	const data = await readFile(filepath,{flag:'r',encoding:"utf-8"})
	const arr = JSON.parse(data)
	const newArr = arr.filter((item)=>{
		return item.id != id; 
	})
	await writeFile(filepath,JSON.stringify(newArr))
}
module.exports = {
	get,
	add,
	del
}