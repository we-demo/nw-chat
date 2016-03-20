'use strict'
const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const RunWebpackPlugin = require('./tool/run-webpack-plugin')
const webpack = require('webpack')
const config = require('./webpack.config')
module.exports = config

config.entry = {
  'entry.js': './src/entry.js',
  'bin.js': './src/bin.js',
}

config.output = {
  path: 'dist_pack/',
  filename: '[name]',
  libraryTarget: 'var'
}

config.plugins.push(
  new CleanWebpackPlugin(['dist_pack/', '../nw-chat-pack/dist/']),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),
  new RunWebpackPlugin(path.resolve('tool/pack.js'))
)
