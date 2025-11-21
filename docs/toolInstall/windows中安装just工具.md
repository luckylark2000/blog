# windows中安装just工具

类似于make，非常方便地运行命令，使用rust编写，跨平台有20多k个star

参考文档<https://just.systems/man/zh/%E5%AE%89%E8%A3%85%E5%8C%85.html>

步骤：

先安装scoop <https://scoop.sh/>

然后用scoop安装just

```bash
scoop install just
```

推荐安装 fzf，原因解释：

- just 是一个命令运行器（类似 Make），通过 Justfile 来定义和运行命令。
- fzf 是一个非常强大的命令行模糊查找工具（fuzzy finder），可以用来交互式地搜索文件、历史命令、进程等。

在某些功能或使用场景下（比如使用 just --choose 命令），just 会调用 fzf 来提供交互式的命令选择界面。如果你没有安装 fzf，这些功能就无法使用。
