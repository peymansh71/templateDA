const path = require('path')
const {merge} = require('webpack-merge')
const WebpackBar = require('webpackbar')

const common = require('./webpack.common.js')

const PORT = process.env.PORT || 3000

// eslint-disable-next-line no-console
console.log(`Project is running at http://localhost:${PORT}`)

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    hot: true,
    port: PORT,
    noInfo: true,
    historyApiFallback: true,
    clientLogLevel: 'silent',
    contentBase: path.join(process.cwd(), 'dist'),
  },
  plugins: [new WebpackBar()],
})
