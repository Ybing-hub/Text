const fs = require('fs')

fs.open('./02hellow.txt','a',(err,fd)=>{
	if (err) {
		console.log('open file err')
	}else{
		fs.write(fd,'css',(err)=>{
			if (err) {
				console.log('write file err')
			}else{
				fs.close(fd,(err)=>{
					if (err) {
						console.log('close file err')
					}
				})
			}
			
		})
	}
})
/*
fs.writeFile('./02hellow.txt','Nodejs',{flag:'a'},(err)=>{
	if (err) {
		console.log('writeFile err')
	}
})
*/