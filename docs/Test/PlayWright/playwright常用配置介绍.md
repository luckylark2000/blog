# playwright常用配置介绍

一般会按照高频顺序介绍

## playwright.config.ts 中的配置

### use

### webServer

可以启动一个 web 服务器或者后台进程，比如 node 服务，参考：<https://playwright.nodejs.cn/docs/test-webserver#multiple-web-servers>

### timeout 设置超时时间

默认单个测试用例的超时时间 `timeout = 30000`，也就是30秒。涉及到一些耗时操作的测试用例，可以设置timeout为更长的时间。

## test.describe.configure

### mode

- mode: serial 串行运行多个测试用例
- mode: parallel 并行运行多个测试用例
