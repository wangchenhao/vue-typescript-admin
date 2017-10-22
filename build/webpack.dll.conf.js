var path = require('path');
const webpack = require('webpack');
const vendors = [
  'es6-promise',
  'axios',
  'js-cookie',
  'lodash',
  'moment',
  'vue',
  'vuex',
  'vue-i18n',
  'vue-router',
  'vue-class-component',
  // "element-ui": "^1.4.0",
];

module.exports = {
  entry: {
    vendor: vendors
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      path: path.resolve(__dirname, '../build/[name]_manifest.json'),
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
  ]
};