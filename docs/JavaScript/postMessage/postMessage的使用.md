# postMessage的使用

## 参考文档

[postMessage](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage)

优点：可以跨域，跨标签页进行双向数据通信。

参考示例：原是 index.html 打开的 postMessage.html

原页面：index.html
被打开的目标页面：postMessage.html

> 注意：
>如果说原页面刷新的话，那么 postMessage.html的引用就会丢失，是恢复不了的，需要重新打开postMessage.html才能继续监听和通信。
>
>目标页面：postMessage.html，如果刷新的话，可以继续监听和通信。

主页面可以通过window.open() 的返回值拿到目标页面的window对象otherWindow，然后调用otherWindow.postMessage()方法发送消息给目标页面。

目标页面可以通过window.opener 拿到主页面的window对象mainWindow，然后调用mainWindow.postMessage()方法发送消息给主页面。

这样就可以实现页面之间的通信了。

## 实战

支付宝支付打开的iframe在支付成功时会给主窗口抛出支付成功的提示，就是通过 postMessage 来通知的。
