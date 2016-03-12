'use strict'
const path = require('path')
const _ = require('lodash')
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const deps = _.keys(require('./package.json').dependencies)

const inlinedDeps = [
  "normalize.css",
  'react',
  'react-dom',
  'react-router',
  "react-redux",
]
const externalDeps = _.without(deps, ...inlinedDeps)

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
