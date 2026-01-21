# postMessage如何区分不同来源的消息

我们知道postMessage是window对象提供的，用于发送消息，接收消息，但是发接收消息的时候来源有以下几种：

- 不同iframe中发出的
- WebWorker中发出的

常见方式：

- 对于不同 iframe/WebWorker 中：message 信息中中携带来源信息，比如messageType 字段，根据这个字段进行判断
- WebWorker 和 iframe 中发出消息的 e 的属性不一样
