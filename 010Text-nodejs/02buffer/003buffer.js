const buff = Buffer.from('姚')
console.log(buff)
const buff1 = Buffer.alloc(3)
buff1[0] = 0xe5;
buff1[1] = 0xa7;
buff1[2] = 0x9a;
console.log(buff1)
console.log(buff1.toString())