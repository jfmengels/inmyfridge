const path = require('path')
const webpack = require('webpack')

const rootPath = path.resolve(__dirname, '..')
const srcPath = path.resolve(rootPath, 'client', 'public')
const buildPath = path.join(rootPath, 'client', 'build')
const babelExclude = path.resolve(rootPath, 'node_modules')

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    srcPath
  ],
  output: {
    path: buildPath,
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
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
        loader:
        'style!css?modules'
      }
    ]
  }
}
