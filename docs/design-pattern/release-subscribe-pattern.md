# 发布订阅模式

## 介绍

## 和观察者模式的区别

这两个是十分相似的，工作中也不用严格区分

- 观察者模式：Subject 和 Observer 直接绑定，中间无媒介
- 发布订阅模式：Publisher 和 Observer 互不认识，中间有媒介
- 看看是否需要手动触发 emit，来大致区分这两个

## UML

## 代码

## 应用场景

- 自定义事件，注意**组件销毁前要 off，避免内存泄露**
- postMessage 通讯

### 自定义事件

- Vue2 本身就是一个 EventBus
- Vue3 不再自带 EventBus 功能，推荐使用 mitt
- 老牌 EventBus-eventEmitter

```ts
import mitt from "mitt";

const emitter = mitt(); //单例，全局唯一，可以在其他文件中emit

emitter.on("foo", e => console.log("foo", e));

// listen to all events
emitter.on("*", (type, e) => console.log("*", type, e));

// fire an event
emitter.emit("foo", { a: "b" });

// clearing all events
emitter.all.clear();
```

### postMessage 通讯

使用发布订阅模式的典型代表

场景

- 网页和 iframe 的通讯

- 其他：多进程（NodeJS WebWorker）通讯，WebSocket 通讯等

举例：网页和 iframe 的通讯
把`main.html`和`child.html`放在一个目录下，使用 http-server 或者 Live Server 启动`main.html`服务就可以了

main.html：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p>
      main page
      <button id="btn1">发送消息</button>
    </p>
    <iframe src="./child.html" frameborder="1" id="iframe1"></iframe>

    <script>
      document.getElementById("btn1").addEventListener("click", () => {
        window.iframe1.contentWindow.postMessage(
          "hello",
          "http://127.0.0.1:8881" //这里一般在开发中要指明地址也就是targetOrigin，因为接收方一般要做origin身份验证
        );
      });
      window.addEventListener("message", event => {
        console.log(event);
        if (event.origin !== "http://127.0.0.1:8881") return;
        console.log("parent receive", event.data);
      });
    </script>
  </body>
</html>
```

child.html 代码：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <p>
      child page
      <button id="btn1">发送消息</button>
    </p>
    <script>
      document.getElementById("btn1").addEventListener("click", () => {
        window.parent.postMessage("world", "http://127.0.0.1:8881");
      });

      window.addEventListener("message", event => {
        console.log(event);
        // 我们能信任信息来源吗？
        if (event.origin !== "http://127.0.0.1:8881") return;
        console.log("child receive", event.data);
      });
    </script>
  </body>
</html>
```
