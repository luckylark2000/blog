# windows 中安装 just 工具

类似于 make，非常方便地运行命令，使用 rust 编写，跨平台有 20 多 k 个 star

参考文档<https://just.systems/man/zh/%E5%AE%89%E8%A3%85%E5%8C%85.html>

步骤：

先安装 scoop <https://scoop.sh/>

如果命令行报了 admin 用户不允许安装的错误，参考这个官方地址：<https://github.com/ScoopInstaller/Install#for-admin>，进行解决

然后用 scoop 安装 just

```bash
scoop install just
```

推荐安装 fzf，原因解释：

- just 是一个命令运行器（类似 Make），通过 Justfile 来定义和运行命令。
- fzf 是一个非常强大的命令行模糊查找工具（fuzzy finder），可以用来交互式地搜索文件、历史命令、进程等。

在某些功能或使用场景下（比如使用 just --choose 命令），just 会调用 fzf 来提供交互式的命令选择界面。如果你没有安装 fzf，这些功能就无法使用。

## 问题整理

justfile 文件可能会被 vscode 认为是 docker 文件，解决办法就是安装 just 的 vscode 插件
