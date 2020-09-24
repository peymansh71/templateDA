const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isProd = process.env.NODE_ENV === 'production'

// Configure status logs while build.
const statsConfig = {
  colors: true,
  hash: true,
  timings: true,
  assets: true,
  chunks: true,
  chunkModules: true,
  modules: true,
  children: true,
}

const bootstrap = './node_modules/bootstrap/scss'

const styleOptions = isModule => {
  const modules = isModule
    ? {
        localIdentName: isProd ? '[hash:base64:5]' : '[local]--[hash:base64:3]',
      }
    : false
  return [
    'style-loader',
    {
      loader: 'css-loader',
      options: {modules},
    },
    {
      loader: 'sass-loader',
      options: {
        additionalData: `
        @import "${path.resolve(
          process.cwd(),
          bootstrap,
          './_functions.scss'
        )}";
        @import "${path.resolve(
          process.cwd(),
          bootstrap,
          './_variables.scss'
        )}";
        @import "${path.resolve(
          process.cwd(),
          './src/styles/_variables.scss'
        )}";`,
      },
    },
  ]
}

module.exports = {
  entry: [path.join(process.cwd(), './index.jsx')],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: isProd ? '[name].[contenthash].js' : '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/},
      {
        test: /.(sc|c|sa)ss$/,
        oneOf: [
          {test: /\.m.(sc|c|sa)ss$/, use: styleOptions(true)},
          {use: styleOptions(false)},
        ],
      },
      {test: /.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/, use: 'url-loader'},
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      assets: path.resolve(process.cwd(), './public/assets'),
      styles: path.resolve(process.cwd(), './src/styles'),
    },
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(process.cwd(), './public/index.html'),
      filename: path.join(process.cwd(), './dist/index.html'),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
    new Dotenv({path: path.resolve(process.cwd(), '.env')}),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash].css' : '[name].css',
      chunkFilename: isProd ? '[id].[contenthash].css' : '[id].css',
    }),
  ],
  stats: statsConfig,
}
