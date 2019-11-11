const crypto = require('crypto')

const hash = crypto.createHash('md5');

hash.digest('hex')