# neovim主题LazyVim的安装的使用问题

## 前提

已经安装 neovim。比较简单可以直接使用 scoop 安装。<https://scoop.sh/#/apps>

## 安装

见官网：<http://www.lazyvim.org/installation>

## 使用

快捷键：<http://www.lazyvim.org/keymaps>

## 常见问题

安装之后，执行：

```bash
:LazyHealth
```

发现有些插件没有安装成功。什么没有安装成功就安装什么就行了。推荐使用scoop安装。

安装：

```bash
scoop install main/mingw

scoop install main/ripgrep

scoop install main/ast-grep

scoop bucket add versions
scoop install versions/python312

scoop install main/luarocks

scoop bucket add extras
scoop install extras/lazygit

scoop install main/tree-sitter

scoop install main/fd

scoop install main/imagemagick
```
