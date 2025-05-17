# 前端性能优化之 CSS

利用浏览器的 Devtool 工具，performance 面板，Layer 面板，回流重绘颜色显示

对于一些动画，尽可能使用 transform 和 opacity 来利用 GPU

使用 will-change 属性来新建图层

减少使用和改变一些出发回流和重绘操作的属性或者代码
比如 操作 dom 的大小，增删 DOM, 位置，访问 clientWidth 等

对于一些必要的的操作 DOM 的情景，使用 fastDom 库来对操作进行统一执行，减少卡顿

第三章 完毕
