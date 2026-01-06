# bun的安装基础使用

Bun 是一个高性能的 JavaScript 运行时，集成了打包、测试、包管理和脚本执行等功能，专为现代服务端开发设计。原生支持 TypeScript

## 安装

```bash
scoop install main/bun
```

## 全局配置

参考：<https://bun.sh/docs/runtime/bunfig#global-vs-local>

在`$HOME`目录下创建`.bunfig.toml`文件

### 配置镜像

<https://bun.sh/docs/runtime/bunfig#install-registry>

`.bunfig.toml`文件中添加：

```toml
[install]
# 设置淘宝镜像
registry = "https://registry.npmmirror.com"
```

### 配置缓存目录

<https://bun.sh/docs/runtime/bunfig#install-cache>

`.bunfig.toml`文件中添加：

```toml
[install.cache]
# cache 缓存目录
dir = "D:/.bun/install/cache"
```

## 注意点

### 不安装 postinstall

Bun 默认出于安全考虑，阻止了一些包的生命周期脚本（如 postinstall）的自动执行。这是 Bun 的一项安全特性，防止恶意代码在安装时自动运行。

postinstall是 npm 包中定义的一个生命周期脚本，在包被安装后自动运行。有些包会用它来做一些初始化工作，比如：

- 编译原生模块
- 显示欢迎信息或赞助提示（如 opencollective-postinstall）
- 检查环境兼容性
- 下载额外资源等

默认 postinstall 会被跳过。如果你信任它们，可以用 `bun pm trust` 来允许并重新运行这些脚本。

一般情况下不需要，实测大多数只是在控制台执行一些打印信息，欢迎、赞助和url较多，除非说不执行项目报错有问题了，或者自己手动去官网确认了postinstall的内容之后才去信任，执行`bun pm trust`
