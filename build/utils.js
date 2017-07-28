var path = require('path')
var glob = require('glob')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    loaders.push({
      loader: 'postcss-loader',
      options: {
        sourceMap: options.sourceMap
      }
    })
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.getMultiEntry = function (globPath) {
  var entries = {};
  glob.sync(globPath).forEach(function (entry) {
    var tmp = entry.split('/').splice(-4);
    var srcIndex = tmp.indexOf('src');
    var pathname = [];
    var name;
    // 获取 src 后的 第 2 个 文件,判断是否有后缀 
    // eg: ./src/entry/**/*.js 会从 entry 后面的那个文件开始判断
    for (var i = srcIndex + 2; i < tmp.length; i++) {
      var extname = path.extname(tmp[i]);
      if (extname) {
        // 有后缀去掉后缀 并 跳出循环
        pathname.push(tmp[i].replace(extname, ''));
        break;
      } else {
        pathname.push(tmp[i]);
      }
    }
    name = pathname.join(path.sep);
    entries[name] = entry;
  });
  // 输出拼接好的object对象
  // console.log(JSON.stringify(entries));
  return entries;
}
