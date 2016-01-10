/* eslint-disable */
// 不能用es2015新语法 只能用原始写法
;(function(){
  var fs = require('fs')
  var auth = require('fs-auth').auth
  var md5 = require('../tool/crypt').md5
  // 不使用require 避开bundle
  var pkg = JSON.parse(fs.readFileSync('./package.json', 'utf8'))

  // 必须与打包的pwd算法一致
  var pwd = [
    ''+pkg.version,
    JSON.stringify(pkg.window),
    md5(fs.readFileSync('index.html', 'utf8')),
  ].join('')

  var script = document.createElement('script')
  script.textContent = auth(fs.readFileSync('dist/entry.go'), pwd)
  document.body.appendChild(script)
  document.body.removeChild(script) // 立即移除隐藏 好像也没事
})()
