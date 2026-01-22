# 什么情况下setTimeout比requestAnimationFrame更好

react 源码里面把task scheduler 从 rAF 换成了setTimeout，原文：

[just out of curiosity, why the latest version of task scheduler stop using requestAnimationFrame? Thanks for the answers~](https://github.com/facebook/react/issues/27998)

微小时间间隔的任务 setTimeout 比 requestAnimationFrame 更好
