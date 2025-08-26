# vue-cli 创建的 vue2 项目中使用 pinia 替换 vuex ，并使用 pinia持久化插件，问题处理

## 配置安装

使用 vue-cli 创建 vue2 项目，自定义安装配置时，不安装 vuex，并安装 pinia 和 pinia-plugin-persistedstate。

如果已经安装了，只需要 npm uninstall vuex 相关的包，然后删除相关的 vuex的代码就可以了，这里不再说明。

关于如何确定安装的版本问题，具体可以去 npm 上面去看周安装量和源码中 package.json 的 peerDependencies 中依赖的包的版本是否和本地的一些依赖包匹配

比如 pinia 2.3.1 依赖 vue 2.7.0+ 或者 vue 3，而 pinia-plugin-persistedstate 4.2.0 依赖 pinia 2.3.0+

根据我的考察，要想在 vue2 中使用 pinia，需要 npm 安装 pinia 2.3.1 和 pinia-plugin-persistedstate 的 4.2.0 版本，这两个周安装量也是比较高的。

安装完之后

在main.js 中使用即可

```patch
+ import { createPinia, PiniaVuePlugin } from "pinia";
+ import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
+ 
+ Vue.use(PiniaVuePlugin);
+ const pinia = createPinia();
+ pinia.use(piniaPluginPersistedstate);

new Vue({
  router,
-  store,
+  pinia,
  render: (h) => h(App),
})
```

如果项目用的是 webpack5 的话，一般就可以跑 pinia 官方的 demo，开始使用了。

## 问题处理

但是我用的是webpack4，因为用的微前端框架，这个是 qiankun 子应用，qiankun 官方对 webpack5 支持不友好

我 npm run dev 启动这个项目的时候运行报错：

```bash
Module parse failed: Unexpected token (18:20)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
|   try {
|     if (runHooks)
>       beforeHydrate?.(context);
|     const fromStorage = storage.getItem(key);
|     if (fromStorage) {

 @ ./src/main.js 11:0-68 16:10-35
 @ multi (webpack)-dev-server/client?http://192.168.3.44:8911/sockjs-node (webpack)/hot/dev-server.js ./src/main.js
```

### 原因

就是说 webpack-dev-server 解析不出来 beforeHydrate?.(context) 这个语法，需要使用 babel 来降级语法。那就是原来vue-cli 自带的 babel 降级配置 `@vue/cli-plugin-babel/preset` 不够用了，需要对 pinia-plugin-persistedstate 单独配置 babel 环境，下面就着手解决一下。

### 解决

安装 babel 相关的包。

根据我踩坑，去 npm 仓库上看了依赖，webpack 4项目最高只能安装 babel-loader@8.4.2，下面直接安装：

```bash
npm install --save-dev babel-loader@8.4.2 @babel/core @babel/preset-env
```

修改 vue.config.js

```patch
configureWebpack: {
  module: {
    rules: [
+      {
+        test: /\.js$/,
+        loader: 'babel-loader',
+        include: [
+          path.resolve(__dirname, 'src'),
+          // 显式包含这个包，让它被 babel 处理
+          /pinia-plugin-persistedstate/
+        ]
+      }
    ],
  },
}
```

修改 babel.config.js 的配置

```patch
module.exports = {
  presets: [
    ["@vue/cli-plugin-babel/preset"],
+    ["@babel/preset-env",
+      { targets: { chrome: '60', ie: '11' }, useBuiltIns: 'usage', corejs: 3 }]
  ],
};

```

重新 npm run dev 就可以了启动项目了

## 总结

本文介绍了如何在 vue-cli 创建的 vue2 项目用 pinia 替换 vuex，使用 pinia 的持久化插件 pinia-plugin-persistedstate，并解决了 pinia-plugin-persistedstate 没有被 babel 降级处理问题。成功启动项目了。
