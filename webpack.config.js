'use strict'
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
    // new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      // hack: 解决mac无边框窗口title显示溢出
      // 默认设置中文空格 需要时再通过js修改
      title: '　'
    }),
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
