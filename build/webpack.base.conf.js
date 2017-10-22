var path = require('path')
var webpack = require('webpack');
var utils = require('./utils')
var config = require('../config')
var svgoConfig = require('../config/svgo-config.json')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: utils.getMultiEntry(config.entry.js),
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {}
  },
  module: {
    rules: [{
      test: /\.ts$/,
      enforce: 'pre',
      loader: 'tslint-loader'
    }, {
      test: /\.ts$/,
      loader: 'awesome-typescript-loader',
      options: {
        transpileOnly: true
      }
    },
    {
      test: /\.html$/,
      loader: 'vue-html-loader'
    },
    {
      test: /\.svg$/,
      use: ['svg-sprite-loader', 'svgo-loader?' + JSON.stringify(svgoConfig)],
      include: /assets\/icons/
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      exclude: /assets\/icons/,
      options: {
        limit: 10000,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('media/[name].[hash:7].[ext]')
      }
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
      }
    }]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./vendor_manifest.json')
    }),
  ]
}

