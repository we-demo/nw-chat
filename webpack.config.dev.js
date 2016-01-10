'use strict'
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const config = require('./webpack.config')
module.exports = config

config.entry = {
  'entry.js': './src/entry.js',
}

config.output = {
  pathinfo: true,
  path: 'dist/',
  filename: '[name]',
  sourceMapFilename: '[name].map',
  libraryTarget: 'var'
}

config.devtool = 'cheap-module-source-map'

config.plugins.push(
  new CleanWebpackPlugin(['dist/']),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
)
