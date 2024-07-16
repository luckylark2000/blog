# 使用 electron-vite 来创建 electron 项目

## 主进程与渲染进程

### 主进程

main，NodeJS
可以调用原生 API，就是直接对接操作系统

### 渲染进程

html，css，JS
主要是控制渲染进程

![alt text](/images/electron-process.png)

### 主进程和渲染进程的通信

通过 preload
