# bli项目问题记录和解决方案

## 用户全局状态记录

pinia 加持久化

## websocket 交互

useWebSocket
使用 Promise 和 Map 二次封装
断线重新连接

## 支付宝支付

iframe 嵌套

加载动画优化，监听 load 事件

## 复制粘贴功能

useClipboard

解决 http 环境下复制粘贴失效问题

## 事件委托监听所有商品点击事件

使用 data-id 属性绑定商品 id，在父元素监听点击事件，通过event.target拿到点击元素，再通过 event.target.dataset.id 拿到商品 id，再通过 id 获取商品信息，设定当前商品为选中商品，展示商品信息。

## 可配置展示用户服务协议

对比 pdf 方案之后

手动将 pdf 或者 doc 文件通过在线文档转成 html，放在 public 文件夹中，在需要的地方使用 iframe 来展示即可，可以新弹出标签页，或者放在弹窗中展示。这样通过 替换 文件夹中的 html 文件，就可以实现服务协议的更新了
