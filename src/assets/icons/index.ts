/**
 * 引入本目录下的所有 svg 格式文件。
 */
import _ from 'lodash';

const files: any = require.context('.', true, /\.svg$/);

const modules: object = {};

files.keys().forEach((key: string) => {
  if (key === './index.js') return;

  const name: string = key.replace(/(\.\/|\.svg)/g, '');

  _.assignIn(modules, {
    [name]: files(key).default,
  });
});

export default modules;
