# doodle-jump

> The Tiny.js game project build by tinyjs-cli

![](https://zos.alipayobjects.com/rmsportal/nJBojwdMJfUqpCWvwyoA.png@120w)

## Badges

[![Build status][build-status-image]][aone-ci-url]
[![Line coverage][line-coverage-image]][aone-ci-url]
[![Branch coverage][branch-coverage-image]][aone-ci-url]

[aone-ci-url]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/link?repo=https://code.alipay.com/Dipper-Map/doodle-jump.git
[build-status-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=https://code.alipay.com/Dipper-Map/doodle-jump.git&type=%E6%9E%84%E5%BB%BA%E7%8A%B6%E6%80%81
[line-coverage-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=https://code.alipay.com/Dipper-Map/doodle-jump.git&type=%E5%8D%95%E6%B5%8B%E8%A1%8C%E8%A6%86%E7%9B%96%E7%8E%87
[branch-coverage-image]: https://aone-api.alibaba-inc.com/ak/testservice/api/badge/query?repo=https://code.alipay.com/Dipper-Map/doodle-jump.git&type=%E5%8D%95%E6%B5%8B%E5%88%86%E6%94%AF%E8%A6%86%E7%9B%96%E7%8E%87

--------------------

## 命令

- `npm install`: 安装依赖
- `npm start`: 本地服务，默认端口：8017
- `npm build`: 执行编译

## 关于 Tiny.js

- `官网`: http://tinyjs.net
- `指南`: http://tinyjs.net/guide/start.html
- `API`: http://tinyjs.net/api/

## 关于标准版

此项目由Tiny.js 本地开发工具 [tinyjs-cli](https://github.com/ant-tinyjs/tinyjs-cli) 使用 [Tiny.js 项目开发模版](https://github.com/ant-tinyjs/wei) 初始化，符合 [webpack 4](https://webpack.js.org/) 标准开发工程流。

项目已集成 [tinyjs-resource-loader](https://github.com/ant-tinyjs/tinyjs-resource-loader)，这是一个用于处理 Tiny.js 游戏资源的 webpack loader，让你更轻松的处理繁杂的资源文件。

当然，你完全可以基于此定制你熟悉的工作流。


> 注意：
>
> 由于 [tinyjs-resource-loader](http://tinyjs.net/tools/tinyjs-resource-loader.html) 依赖 [ImageMagick](https://www.imagemagick.org/script/download.php)，所以你需要安装 ImageMagick。
