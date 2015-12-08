/* eslint strict: 0 */
'use strict';

const webpack = require('webpack')

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loaders: ['file-loader']
      }
    ]
  },
  entry: {
    'main.js': './src/main.js'
  },
  output: {
    path: 'dist/',
    filename: '[name]',
    libraryTarget: 'var'
  },
  target: 'node-webkit',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    
  ],
  externals: [
    
  ]
};
