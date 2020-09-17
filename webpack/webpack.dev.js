const path = require('path')
const {merge} = require('webpack-merge')
const WebpackBar = require('webpackbar')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    hot: true,
    noInfo: true,
    clientLogLevel: 'silent',
    contentBase: path.join(process.cwd(), 'dist'),
  },
  plugins: [new WebpackBar()],
})
