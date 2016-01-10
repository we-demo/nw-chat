'use strict'
function RunWebpackPlugin(src){
  this.src = src
}

RunWebpackPlugin.prototype.apply = function(compiler){
  compiler.plugin('done', () => {
    require(this.src)
    delete require.cache[require.resolve(this.src)]
  })
}

module.exports = RunWebpackPlugin
