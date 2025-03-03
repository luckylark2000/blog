# 解决 corejs is not a valid top-level option.

今天对 Vue2 的老项目 babel配置进行升级，更新core-js 到 3.x，npm run build的时候遇到了一个问题。

corejs is not a valid top-level option.

看项目的报错位置是在src/main.js中，但是我的main.js中没有引入core-js。

去网上找了一些处理方法，基本上都是说删除 `node_modules` 重新安装但是对我都没有效果；还有说换cnpm，yarn的，但是我们的项目生产环境是基于流水线，更换的话，还要改配置，就没有考虑更换包管理工具，还是使用 npm。

无果之后，我仔细分析了代码发现man.js中引入了 polyfill 的

```js
import '@babel/polyfill'
```

去node_modules里@babel/polyfill上查了一下，它的依赖是core-js ^2.6.5，但是我升级的是core-js 3.x，所以基本上就是这个问题了。

为了进一步验证，我还去babel的官网上查了一下，发现[@babel/polyfill](https://babeljs.io/docs/babel-polyfill)已经被废弃。所以不能用 @babel/polyfill了。

按理说我应该接着完整地阅读一下babel的使用文档，然后去配置一番，我读到一小半之后，突然想到，既然是 Vue的项目，直接使用vue-cli创建一个新的 babel+eslint 的模板，人家之前维护好的肯定比自己考虑的更多。

于是自己就把 `import '@babel/polyfill'`删了，对着模板比个葫芦画个瓢，最后解决了哈哈哈，当然中间还是升级和修改了一些babel的配置文件，但是这个内容就不是本文所要说的了，需要具体问题具体分析。

最后思考一下为啥会出现这个问题呢？我认为是因为依赖冲突了，@babel/polyfill依赖的core-js是2.x，而我们项目依赖的core-js是3.x，导致插件之间不兼容，所以出现了这个错误。
