# 带有重试机制的websocket信息发送机制

## 参考项目和文章

[axios-retry](https://github.com/softonic/axios-retry/blob/master/src/index.ts)

[实现带重试机制的接口请求（原生js方案&Axios方案）](https://juejin.cn/post/7372445124754309139)

[Promise的retry（重试）功能实现](https://blog.csdn.net/qq_40420294/article/details/101920789)

## 核心思路

重试思路

检测当前的状态

是否需要重试

如果接口返回的有失败信息，就直接失败就行，不用重试

如果接口没有返回失败信息，而是抛出的超时，需要重试

重试超过最大次数，就抛出超时错误
