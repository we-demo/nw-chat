'use strict'
const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const deps = _.keys(require('./package.json').dependencies)

const inlinedDeps = [
  'normalize.css',
  'react',
  'react-dom',
  'react-router',
  "react-redux",
]
// const externalDeps = _.without(deps, ...inlinedDeps)
const externalDeps = _.without.apply(null, [deps].concat(inlinedDeps))

module.exports = {
  module: {
    preLoaders: [
      { test: /\.jsx?$/, include: path.resolve('src'), loader: 'eslint' },
    ],
    loaders: [
      { test: /\.jsx?$/, include: path.resolve('src'), loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
    ]
  },
  target: 'node-webkit',
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    alias: {
      // 不用react-lite 影响Editor:focus/blur
      // 'react': 'react-lite',
      // 'react-dom': 'react-lite',
    },
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },

  // fixme: 这种方式存在问题 比如react/node_modules/fbjs的解析
  // 由于是nw/node环境 默认将依赖external
  // https://github.com/fritx/os-web/blob/dev/task/webpack.server.js
  // externals: [
  //   (ctx, req,  cb) => {
  //     // if (resolve(ctx, req).indexOf(serverDir) !== 0) return cb()
  //     if (/^\.\.?\//.test(req)) return cb()
  //     if (inlinedDeps.indexOf(req) > -1) return cb()
  //     cb(null, `commonjs ${req}`)
  //   },
  // ],

  plugins: [
    new WebpackNotifierPlugin({ alwaysNotify: true }),
    // new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', externalDeps),
    new webpack.ProvidePlugin({
      Promise: 'bluebird',
    }),
    // new webpack.DefinePlugin({
    //   'rootDir': JSON.stringify(__dirname)
    // })
  ],
};
