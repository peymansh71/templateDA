const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

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

const styleOptions = isModule => [
  'style-loader',
  {loader: 'css-loader', options: {modules: isModule}},
  'sass-loader',
]

module.exports = {
  entry: [path.join(process.cwd(), './index.jsx')],
  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: 'index.js',
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
    }),
    new Dotenv({path: path.resolve(process.cwd(), '.env')}),
  ],
  stats: statsConfig,
}
