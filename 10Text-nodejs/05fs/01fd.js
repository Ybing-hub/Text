const fs = require('fs')

const fd = fs.openSync('./02hellow.txt','w')

fs.writeSync(fd,'hellow')
fs.closeSync(fd)