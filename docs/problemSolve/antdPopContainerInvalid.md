# antd vue 的 Popup 类组件 getPopupContainer 挂载容器失效问题

## 问题秒速

Tooltip、Popconfirm、Popover 组件有一个 api 是 getPopupContainer，可以指定挂载的容器，默认是 document.body，但是今天在指定的时候失效了。

## 原因分析

原因是父元素的元素要是一个relative元素，否则无效。Popup类组件默认都是 absolute，所以会一层一层地找，直到找到一个 relative 元素，或者 document.body 才挂载。

## 解决方法

在最近的父元素样式上添加 position: relative即可
