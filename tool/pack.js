'use strict'
const Promise = require('bluebird')
const fs = require('fs-extra')
const exec = require('child_process').exec
const lock = require('fs-auth').lock
const md5 = require('./crypt').md5
const pkg = require('../package.json')

const pwd = [ // pwd算法需要时常更换
  ''+pkg.version,
  JSON.stringify(pkg.window),
  md5(fs.readFileSync('index.html', 'utf8')),
].join('')
console.log(pwd)

const pack_dir = '../nw-chat-pack'
const dist_pack = 'dist_pack'
const items = [
  'media',
  'index.html',
  'package.json',
]

const dependencies = Object.keys(pkg.dependencies)
  .map(key => `node_modules/${key}`)
items.push.apply(items, dependencies)


Promise.resolve()
.then(() => {
  fs.ensureDirSync(`${pack_dir}/dist`)
})
.then(() => {
  const buf = lock(fs.readFileSync(`${dist_pack}/entry.js`, 'utf8'), pwd)
  fs.writeFileSync(`${pack_dir}/dist/entry.go`, buf)
})
.then(() => {
  // copy文件
  return Promise.all(
    items.map(item => new Promise((res, rej) => {
      fs.copy(item, `${pack_dir}/${item}`, err => {
        if (err) return rej(err)
        res()
      })
    }))
  )
})
.then(() => {
  // nw bin snapshot
  return new Promise((res, rej) => {
    exec(`nwjc ${dist_pack}/bin.js ${pack_dir}/dist/nw.bin`, err => {
      if (err) return rej(err)
      res()
    })
  })
})
.then(() => {
  console.log('pack done')
})
.catch(err => {
  console.error(err)
})
