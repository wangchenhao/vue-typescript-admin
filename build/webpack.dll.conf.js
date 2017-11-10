const path = require('path');
const webpack = require('webpack');
const vendors = [
  'babel-polyfill',
  'qs',
  'axios',
  'js-cookie',
  'lodash',
  'moment',
  'vue/dist/vue.esm.js',
  'vuex',
  'vue-i18n',
  'vue-router',
  'vue-class-component',
  'vue-property-decorator',
  'vuex-class',
  'element-ui',
];

module.exports = {
  entry: {
    vendor: vendors
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      'vue': 'vue/dist/vue.esm.js',
    }
  },
  output: {
    path: path.resolve(__dirname, '../static'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
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
