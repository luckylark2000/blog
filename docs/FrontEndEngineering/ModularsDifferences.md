# CommonJS、AMD 和 ESM 之间的区别

## AMD

- AMD 规范采用非同步加模；允许指是回调函数
- Node 模块通常都位于本地，加载速度快，所以适用于同步加载
- 浏览器环境下，模块需要请求获取，所以适用于异步加载
- require.js 是 AMD 的一个具体实现库

## CMD

- CMD 整合了 CommonJS 和 AMD 的优点，模块加载是异步的
- CMD 专门用于浏览器端，，sea.js 是 CMD 规范的一个实现
- AMD 和 CMD 最大的问题是没有通过语法升级解决模块化

### ESM

- ESModule 设计理念是希望在编译时就确定模块依赖关系及输入输出
- CommonJS 和 AMD 必须在运行时才能确定依赖和输入、输出
- ESM 通过 import 加载模块，通过 export 输出模块

## CommonJS 和 ESModule 规范对比

- 1.CommonJS 模块输出的是值的拷贝，ES6 模块输出的是值的引 l 用
- 2.CommonJS 模块是运行时加载，ES6 模块是编译时输出接口
- 3.CommonJs 是单个值导出，，ES6 Module 可以导出多个
- 4.CommonJS 模块为同步加载，ESModule 支持异步加载
- 5.CommonJS 的 this 是当前模块，ESModule 的 this 是 undefined
- 6.CommonJS 和 ESModule 的语法不同

NodeJS 默认采用 CommonJS 作为规范，node14 之后支持 ESModule
NodeJS 默认采用 ESModule 作为规范

### 脚本和模块对比

- 模块具备更高的开发效率(可读性强、复用高效)
- 脚本具有更高的页面性能(模块文件多，加载速度慢)
- 模块在浏览器中运行会存在兼容性问题，要要特别注意

### 浏览器模块化的局限

- 缺乏模块管理能力，模块分散在各个项目中
- 性能加载慢，无法大型项目中直接使用
- 这两个问题是 npm 和 webpack 核心解决的问题
