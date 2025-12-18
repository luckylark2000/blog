# playwright 中如何模拟 websocket

官方文档在：<https://playwright.cn/docs/api/class-websocketroute>

官方的视频：<https://www.youtube.com/watch?v=VGlkSBkMVCQ>

一定要自己动手实现一下！如果自己有项目的话，也要拿来练一下手

虽然官方的文档写得简单，如果不动手，非常容易眼高手低。

最好先看一遍官方的文档，几分钟就能看完

## 基础示例

```ts
// 属于纯模拟 websocket，不会给服务器发消息
await page.routeWebSocket('wss://example.com/ws', ws => {
  ws.onMessage(message => {
    console.log("发送给服务器的信息",message);
    if (message === 'request')
      ws.send('模拟服务器响应信息：response');
  });
});
```

一般情况下用 page.routeWebSocket() 来拦截 websocket 请求的，拦截之后是不会像服务器发消息的。

如果需要给真实服务器发消息或者改写真实服务器返回的消息的话需要调用 `webSocketRoute.connectToServer()` 返回值是服务器端 WebSocketRoute 实例 wsServer，可以拦截服务器发来的真实消息。

一定要注意：

- 拦截客户端发送的消息，一定要用 `ws.onMessage`；拦截服务器发来的消息，一定要用 `wsServer.onMessage`
- 模拟服务器返回的消息，一定是 `ws.send`；给真实服务器发消息，一定要用 `wsServer.send`

## 常见用法

### 不需要连接真实服务器

就跟上面基础示例一样

示例：

```html
<!-- 使用 Live Server 打开 -->
```

```ts
//测试用例
```

### 需要连接真实服务器

```ts
// 属于需要连接真实服务器，可能会根据服务器的返回消息进行拦截
await page.routeWebSocket('/ws', ws => {
  const server = ws.connectToServer();
  
  ws.onMessage(message => {//监听客户端发送的消息
    if (message !== 'blocked-from-the-page'){
      // 修改消息后转发给真实服务器
      server.send(message.replace("old", "new"));
    }
  })

  server.onMessage(message => {// 监听服务器发来的消息
    if (message !== 'blocked-from-the-server'){
      // 修改响应后发回给客户端
      ws.send({
        code: 0,
        msg: "续期成功",
        ...message
      });
    }
  });
})
```

```html
<!-- 使用 Live Server 打开 -->
```

```js
```

```ts
//测试用例
```

## 常见问题

### websocketRoute 监听（拦截）不到

解决办法：

- 重要：加 console.log 日志或者断点调试
- 监听不到可能是因为监听的位置太晚了，可以放在测试用例的最上面
- 如果涉及到多个页面，可能该 page 的创建时间比较晚，也可以直接放在用 `context.routeWebSocket` 然后在测试用例的最开始进行监听
