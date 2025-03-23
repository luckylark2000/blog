# 自动在 index.html 中添加打包后的文件中包含的外链 dns-prefetch

## 背景

就是浏览器的 dns-prefetch 可以在加载 html 文件的时候就可以对设定的外链进行 dns 预解析。

我们在项目中如果想要提高首屏加载时间的话，可以对这些外链在 index.html 中设置 dns-prefetch。

具体做法就是在 npm run build 之后对打包后的 dist 中所有文件进行正则匹配，提取出来所有的外链，自动把这些外链加入到 index.html 中。

具体实现代码：
参考资料：<https://www.bilibili.com/video/BV1vmK3ewEuD/?spm_id_from=333.1007.tianma.8-2-28.click&vd_source=9a25169e10cee14a220c559b6e40fdc0>

```js
// glob表达式获取文件路径
// 文件读取
// 正则匹配外链
// 将外链加入到index.html中
```
