const path = require('path')
const { merge } = require('webpack-merge')
const Dotenv = require('dotenv-webpack')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  plugins: [new Dotenv()],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
})
