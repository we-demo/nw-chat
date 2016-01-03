'use strict'
const webpack = require('webpack')
const WebpackNotifierPlugin = require('webpack-notifier')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PORT = 3119

module.exports = {
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint' },
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'react-hot!babel' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.scss$/, loader: 'style!css!sass' },
    ]
  },
  entry: {
    'entry.js': [
      'webpack-dev-server/client?http://localhost:'+ PORT,
      'webpack/hot/only-dev-server',
      './src/entry.js'
    ]
  },
  output: {
    pathinfo: true,
    path: 'dist/',
    publicPath: 'http://localhost:'+ PORT +'/',
    filename: '[name]',
    sourceMapFilename: '[name].map',
    libraryTarget: 'var'
  },
  devServer: {
    hot: true,
    inline: true,
    historyApiFallback: true,
    colors: true,
    progress: true,
    port: PORT
  },
  devtool: 'cheap-module-source-map',
  target: 'node-webkit',
  node: {
    __filename: true,
    __dirname: true
  },
  resolve: {
    // alias: {
    //   'react': 'react-lite',
    //   'react-dom': 'react-lite',
    // },
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new CleanWebpackPlugin(['dist/']),
    // new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
