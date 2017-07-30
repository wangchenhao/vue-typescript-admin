/**
 * 获取到 common 目录下所有定义的组件
 * 返回 组件对象集合
 * 测试阶段 后面如果问题太多将 改为手动引入
 */
import _ from 'lodash';

const files: any = require.context('.', true, /\.ts$/);

const modules: object = {};

files.keys().forEach((key: string) => {
  // 排除本文件
  if (key === './index.ts') { return; }
  // 排除没有默认返回的文件
  const module = files(key).default;
  if (_.isEmpty(module)) { return; }

  const path: string = key.replace(/(\.\/)/g, '');
  const pathArray: string[] = path.split('/');
  const lastPath: string | undefined = _.last(pathArray);
  // 排除路径为空
  if (pathArray.length === 0) { return; }

  let name: string;
  if (pathArray.length === 1) {
    // 只是一级目录，取文件名
    name = key.replace(/(\.\/|\.ts)/g, '');
  } else {
    if (lastPath && lastPath.indexOf('index') === -1) {
      // 文件名如果不是 index 使用文件名
      name = key.replace(/(\.\/|\.ts)/g, '');
    } else {
      // 多级目录 并且 文件名为 index 的取文件上级文件夹名
      name = pathArray[pathArray.length - 2];
    }
  }
  // 拼接对象 相同name 的对象会被覆盖掉
  _.assignIn(modules, {
    [name]: module,
  });
});

export default modules;
