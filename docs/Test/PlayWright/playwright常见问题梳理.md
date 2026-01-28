# playwright 常见问题梳理

## 安装很慢

### vscode 中安装浏览器内核慢

就是这个`ctrl + shift + p` 后搜索 `Test:install playwright`，设置好点击ok之后安装内核的过程比较慢

建议开代理，梯子。

### npx playwright install 很慢

设置镜像加速

新建.env，写入：

```bash
PLAYWRIGHT_DOWNLOAD_HOST=https://npmmirror.com/mirrors/playwright
```

## .specs.ts 没有显示三角执行图标

vscode 没有识别出 specs.ts 文件并显示三角执行图标

一般情况下是因为，你电脑卡了，或者 vscode 卡了。可以试试重启电脑或者 vscode，其它的情况如果有报错之类的，自行搜索解决

## 多workspace工作空间playwright插件失效

playwright 的vscode插件多workspace插件失效，识别不了测试用例，没有运行图标，所以请保持当前工作目录只有一个工作空间

## 获取一个元素时间超过默认时间怎么处理

- 最关键的就是找到是什么原因阻塞的，等待该事件，一般情况加是接口响应速度慢，在这个元素之前加上 waitForResponse
- 简单一点就是添加超时参数，例如 `page.getByRole("checkbox", { name: "我已阅读并同意" }).waitFor({ timeout: 20000 })`

## 如何 mock 一个 websocket

```ts
await page1.routeWebSocket("ws://127.0.0.1:1234/", (ws) => {
  const server = ws.connectToServer();
  ws.onMessage((message) => {
    if (message === "request") server.send("request2");
    else server.send(message);
  });
});
```

## 单个用例运行超时怎么处理

默认超时时间是 30 秒

可以在测试的内部添加超时时间

```ts
test("百度", async ({ page, context }) => {
  test.setTimeout(100000);//设置超时时间为 100 秒
  await page.goto("https://www.baidu.com");
})
```

## 无头模式下打开新的页面来预览 pdf 测试进层会卡住

在 headless 模式会卡住，因为打开的是一个 pdf 新页面，无头模式没有 PDF 阅读器渲染，永远不会 domcontentloaded，在 head 模式下不会卡住，因为浏览器内置的有 PDF 阅读器渲染

```patch
-await page.waitForLoadState("domcontentloaded");
+expect(page.url())
```

## websocketRoute 监听不到

解决办法：

- 监听不到可能是因为监听的位置太晚了，可以放在测试用例的最上面
- 如果涉及到多个页面，可能该 page 的创建时间比较晚，也可以直接放在用 `context.routeWebSocket` 然后在测试用例的最开始进行监听
