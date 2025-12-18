# 微信小程序学习记录

## 基础项目目录文档结构

### pages

pages 是放所有页面的地方，pages 里面一个页面，需要对应一个子文件夹，子文件夹里面下一般有四种文件：

- index.js 文件，页面的入口，交互逻辑
- index.wxml 文件，页面的结构，类似于 dom 元素，用来布局
- index.wxss 文件，页面的样式，类似于 css
- index.json 文件，页面的配置文件

## utils

utils 是放所有工具类，工具函数的地方，比如说 http 请求工具

### app.js

app.js 是小程序的入口文件

### app.json

app.json 是小程序的全局配置文件

- 页面路由

- 设置头，背景色

- 底部的 tab 栏

### app.wxss

app.wxss 是小程序的全局样式文件
project.config.json 是小程序的项目的配置文件，**大多数情况不需要修改**

### sitemap.json

sitemap.json 是小程序的搜索和索引文件

配置信息，哪个页面能被搜索到，

## 进阶

如果有页面个性化配置，就在页面对应的 json 文件中配置相关的信息否则就会继承 app.json 中的配置

### dom 指令操作

wx:if wx:for wx:key wx:else 都和 vue 2 中的 `v-` 系列指令一样

hidden 属性 和 v-show 属性类似

关于样式：**像素单位一律使用 rpx，微信小程序中规定，无论手机设备的屏幕宽度有多大，最大宽度都为 750 rpx**

### 事件绑定

对于一个 dom 来说，直接 ctrl i 就可以查看所有可以绑定的事件，常见的事件有：

- bind:tap
- bind:longpress

### 生命周期（非常重要）

#### 小程序的生命周期啊

#### 页面的生命周期

就是页面的生命周期，比如：

onLoad
onShow
onReady
onHide
onUnload
onPullDownRefresh
onReachBottom
onShareAppMessage
onPageScroll
onTabItemTap

#### 组件的生命周期
