const crypto = require('crypto')

const hash = crypto.createHash('md5');
hash.update('zmm')
hash.digest('hex')