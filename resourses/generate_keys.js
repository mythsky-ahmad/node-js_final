const crepto = require('crypto')


const key1= crepto.randomBytes(32).toString('hex')
const key2= crepto.randomBytes(32).toString('hex')
console.table({key1 , key2})