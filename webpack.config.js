'use strict'
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
    ]
  },
  entry: {
    'entry.js': './src/entry.js'
  },
  output: {
    pathinfo: true,
    path: 'dist/',
    filename: '[name]',
    sourceMapFilename: '[name].map',
    libraryTarget: 'var'
  },
  devtool: 'cheap-module-source-map',
  target: 'node-webkit',
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin(['dist/']),
    // new webpack.NoErrorsPlugin(),
    new webpack.ExternalsPlugin('commonjs', [
      'babel-polyfill',
      'lodash',
      'chance',
      'nconf',
      'user-home',
    ]),
    new webpack.DefinePlugin({
      'rootDir': JSON.stringify(__dirname),
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    })
  ],
  externals: [
    
  ]
};
