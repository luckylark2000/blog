# 前端性能优化之 CSS

利用浏览器的 Devtool 工具，performance 面板，Layer 面板，回流重绘颜色显示

对于一些动画，尽可能使用 transform 和 opacity 来利用 GPU

使用 will-change 属性来新建图层

减少使用和改变一些出发回流和重绘操作的属性或者代码
比如 操作 dom 的大小，增删 DOM, 位置，访问 clientWidth 等

对于一些必要的的操作 DOM 的情景，使用 fastDom 库来对操作进行统一执行，减少卡顿

第三章 完毕

## CSS 优化

如果涉及到一些可以使用合成线程来处理CSS特效或者动画的情况，就尽量使用will-change来提前告诉渲染引擎，让它为该元素准备独立的层。

例如：

```css
.box {
  /*提前告诉渲染引擎box元素将要做几何变换和透明度变换操作*/
  will-change: transform, opacity;
}
```

但是凡事都有两面性，每当渲染引擎为一个元素准备一个独立层的时候，它占用的内存也会大大增加，因为从层树开始，后续每个阶段都会多一个层结构，这些都需要额外的内存，所以你需要恰当地使用 will-change
