# 浏览器页面手动点击返回按钮，页面没有请求数据

今天有一个单点登录页面，点击登录会先去一个中间页面

解决方案：

页面新增逻辑，如果命中了 bfcache，那么页面就不会刷新，所以需要手动刷新页面

代码

```javascript
window.addEventListener('pageshow', function (event) { 
  if (event.persisted) {
    window.reload();
  }
})

// 页面退出的时候，取消监听器
window.removeEventListener('pageshow', function (event) { })
```
