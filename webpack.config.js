'use strict'
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
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: {
    'entry.js': './src/entry.js'
  },
  output: {
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
    // new webpack.NoErrorsPlugin(),
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
