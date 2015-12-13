'use strict'
const webpack = require('webpack')
const DefinePlugin = webpack.DefinePlugin

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: {
    'web.js': './src/web.js',
    'main.js': './src/main.js'
  },
  output: {
    path: 'dist/',
    filename: '[name]',
    libraryTarget: 'var'
  },
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
    new webpack.NoErrorsPlugin(),
    new DefinePlugin({
      'rootDir': JSON.stringify(__dirname),
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
      }
    })
  ],
  externals: [
    
  ]
};
