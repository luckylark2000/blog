# Promise的重试功能实现

题目秒速

```txt
已有请求函数getData，其功能为异步请求数据返回promise对象，如getData(params).then(…).catch(…)。

实现一个myGetData,返回promise对象，要求加入失败重试功能，该函数内部依然使用getData实现，在getData失败一次后间隔一秒钟再重试一次，直到重试到第五次、如果全都失败了，myGetData所返回的promise为reject，只要有任意一次成功，则停止重试，知道resolve结果。
```
