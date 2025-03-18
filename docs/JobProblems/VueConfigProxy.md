# 前端代理不生效

我们在`vue.config.js`中配置代理，但是代理不生效

生效规则是从前到后，匹配到第一个就停止，然后就不再匹配后面的了

打印配置
logLevel

```js
devServer: {
  port: port,
  proxy: {
    '/api1': {
      target: 'http://111.111.111.111:123',
      changeOrigin: true,
      pathRewrite: { '^/api1': '' },
      logLevel: 'debug',// 控制台输出
    },
    '/api2': {
      target: 'http://111.111.111.111:123',
      changeOrigin: true,
      pathRewrite: { '^/api2': '' },
      logLevel: 'debug',// 控制台输出
    },
  },
}
```

嵌入乾坤中，主项目要和子项目配置代理保持一致，因为子项目的网络会被主项目代理拦截，拦截之后不会继续走子项目的代理。

## 代理配置

## 解决方法

就是一样的
