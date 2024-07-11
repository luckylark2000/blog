# Ajax 网络通信

## XMLHttpRequest

XMLHttpRequest(XHR)对象用于与服务器交互。通过 XMLHttpRequest 可以在不刷新页面的情况下请求特定的 URL，获取数据。允许网页在不影响用户操作的情况下，更新页面的布局内容。不仅仅知识 HTTP 协议，还支持`file://`和`FTP`

### 构造函数 XMLHttpRequest()

The XMLHttpRequest() 构造器初始化一个新的 XMLHttpRequest 对象。

### 实例属性

#### readState

XMLHttpRequest.readyState 属性返回一个 XMLHttpRequest 代理当前所处的状态。状态可以是：
| 值 | 状态 | 描述 |
|---|------------------|------------------------------|
| 0 | UNSENT | 代理被创建，但尚未调用 open() 方法。 |
| 1 | OPENED | open() 方法已经被调用。 |
| 2 | HEADERS_RECEIVED | send() 方法已经被调用，并且头部和状态已经可获得。 |
| 3 | LOADING | 下载中；responseText 属性已经包含部分数据。 |
| 4 | DONE | 下载操作已完成。 |

### 实例方法

### 事件

### 继承

## 手写一个简易的 ajax

## 跨域大常见实现方式

## 知识点

### XMLHttpRequest

### 状态码

### 跨域：同源策略，跨域解决方案
