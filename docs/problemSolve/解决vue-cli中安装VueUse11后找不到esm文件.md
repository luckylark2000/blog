# 解决 vue-cli 中安装 VueUse11 后启动时找不到esm文件的问题

报错类似：
Can't import the named export XXXX from non EcmaScript module (only default export is available)

原因时vue-cli使用 webpack4 的时候引入的 VueUse11 版本中，esm文件被 webpack4 识别为非 esm 文件，导致报错。

解决方法：
参考：<https://github.com/vueuse/vueuse/issues/718>

```js
// vue.config.js

module.exports = {
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }]
    }
  }
}
```
