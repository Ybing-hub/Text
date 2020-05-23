var fs = require('fs')
//1、打开文件
const fd = fs.openSync('./02hello.txt','r')
//2、读取文件
const buff = Buffer.alloc(100)
fs.readSync(fd,buff,0,50,0)
console.log(buff)
//3、关闭文件
fs.closeSync(fd)