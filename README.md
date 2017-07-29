# AdminTs

> 构建的基于 Vue TypeScript 开发环境。 支持多页面开发。有什么问题可以提交 Issues 或者 用其他方式联系我。

## 技术栈
- [vue](https://cn.vuejs.org/)
- [vue-router](https://router.vuejs.org/zh-cn/)
- [vuex](https://vuex.vuejs.org/zh-cn/)
- [vue-i18n](https://kazupon.github.io/vue-i18n/en/)
- [element-ui](http://element.eleme.io/#/zh-CN/component/installation)
- [axios](https://github.com/mzabriskie/axios)
- [typescript](http://www.typescriptlang.org/) [中文版](https://www.tslang.cn/)

### 特性

- 引入了Vue 2.0全家桶的环境
- 配置好了webpack
- 配置好了一个UI库 - element-ui
- 使用了 TypeScript
- 引入lodash，快速开启FP

> 项目中不支持 非 ts 文件开发模式，没有内置测试模块，如果需要可以自行添加。

### 目录说明

```
├── README.md
├── build // 项目构建文件
├── config // 项目构建配置
├── dist  // 打包构建后的文件夹
├── index.html // 默认模板文件
├── package.json
├── .postcssrc.js // postcss 配置文件
├── tsconfig.json // typescript 配置文件
├── tslint.json // tslint 配置文件
└── src
    ├── Basic.ts // 入口文件基础配置
    ├── Http.ts // 创建 axios 做基本配置 及 http 拦截器配置文件
    ├── Filters.ts // 增加 Vue 可用过滤器
    ├── assets
    │   ├── icons  // svg 图标
    │       └── index.ts // 导入 icons 目录下的所有 svg 文件，返回 svg 集合对象
    │   ├── images
    │   └── style 
    │       ├── theme  // element-ui 样式库
    │       ├── element-variables.css  // element-ui 变量文件
    │       └── ...  // 自定义 样式 支持 scss postCSS
    ├── common  // 公共组件
    │   ├── Icon.ts  // Icon 组件
    │   └── index.ts // 读取 common 目录下的所有 ts 文件，返回 组件集合对象
    ├── config // 公共常量
    ├── entry // 默认入口文件目录 可以在 ./config/index.js 修改
    ├── i18n // vue-i18n 国际化配置
    ├── router // vue-router 路由配置
    ├── store // vuex 配置
    │   ├── modules
    │   ├── types 
    │   ├── actions.ts
    │   ├── getters.ts
    │   └── index.ts // 返回 vuex store 对象
    ├── typings // TS类型声明文件
    └── views 
```
>关于UI主题的配置可以参考element-ui官方的[custom-theme](http://element.eleme.io/#/zh-CN/component/custom-theme)

### 启动工程

``` bash
# 下载依赖
npm install  or yarn

# 开启服务热更新 localhost:3000
npm run dev

# 导出生产包
npm run build

# 导出生产包并查看包分析报告
npm run build --report
```