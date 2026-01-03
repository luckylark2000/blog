# wsl 使用技巧

## 不同环境进入不同文件路径

常见需求：命令行进入 wsl 需要直接进入 home(~) 目录，vscode 中打开 terminal 进入 wsl 需要进入的是项目所在文件路径（这个是默认的）。具体操作如下：

打开 .zshrc 文件

```bash
nano ~/.zshrc
```

在 .zshrc 末尾添加：

```bash
[[ "$TERM_PROGRAM" != "vscode" ]] && cd ~
```

保存后重新加载配置

```bash
source ~/.zshrc
```

解释一下：就是如果使用的是 vscode 打开的终端，会为终端设置一个环境变量 TERM_PROGRAM，这个变量的值为 `vscode`。我们根据这个这个变量的值来决定是否执行`cd ~`操作。

以此类推如果需要兼容其他编辑器，只需要将 `vscode` 替换成其他编辑器的名称即可。
