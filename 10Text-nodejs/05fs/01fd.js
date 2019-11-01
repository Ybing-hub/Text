const fs = require('fs')
/*
const fd = fs.openSync('./02hellow.txt','w')

fs.writeSync(fd,'hellow')
fs.closeSync(fd)
*/
//综合
fs.writeFileSync('./02hellow.txt','world',{flag:'a'})