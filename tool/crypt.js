'use strict'
// 不能用es2015新语法 只能用原始写法
var crypto = require('crypto')

exports.md5 = function md5(str){
  return crypto.createHash('md5').update(str).digest('hex')
}
