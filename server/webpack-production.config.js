const path = require('path')
const webpack = require('webpack')

const rootPath = path.resolve(__dirname, '..')
const srcPath = path.resolve(rootPath, 'client', 'public')
const buildPath = path.join(rootPath, 'client', 'build')
const babelExclude = path.resolve(rootPath, 'node_modules')

module.exports = {
  devtool: 'source-map',
  entry: [
    srcPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        include: srcPath,
        exclude: babelExclude
      },
      {
        test: /\.css$/,
        loader: 'style!css?modules'
      }
    ]
  }
}
