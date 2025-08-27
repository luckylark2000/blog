# try 和 catch 捕获不到 WebSocket 构造函数的连接错误

## 背景

我观察到，websocket 连接异常的时候，浏览器控制台可以看到代码在 `new WebSocket(url)` 这一行抛出异常，我就想看一下这个异常类型，但是 try 和 catch 却捕获不到。

```js
try {
  obj = new WebSocket(url)
} catch (e) {
  console.log(e)
}
```

## 分析原因

核心原因：new WebSocket(url) 构造函数本身通常不会抛出同步异常（synchronous exception），因此 catch 块无法捕获连接失败。

而且全局监听错误事件 `window.addEventListener('unhandledrejection')`，`window.addEventListener('error')` 也无法捕获 WebSocket 连接错误。

那为什么浏览器 DevTool 可以捕获到 WebSocket 连接错误呢？

浏览器内核（如 Chromium 的 Blink/Network Service）在底层处理网络请求和 WebSocket 握手。当这个过程失败时，网络层会产生一个错误日志。开发者工具（DevTools）是浏览器的一部分，它有权访问这些底层日志，并将其呈现给开发者。但这是一种调试工具的特权，而不是暴露给网页中运行的 JavaScript 代码的 API。

## 总结和解决方法

浏览器在 `new WebSocket(url)` 这一行抛出异常，还是可以看到执行栈信息的，辅助我们定位错误。

如果想要捕获连接失败，需要使用 WebSocket 的 onerror 事件。

那如果想要全局捕获呢？

可以在websocket 的 onerror 事件中抛出错误，比如 console.error(e)

如果生产要移除 console 的话，就只能使用埋点捕获上报错误了，可以使用第三方库比如 sentry 来捕获和上报错误。
