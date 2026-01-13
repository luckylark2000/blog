# LazyVim的常见快捷键

`<leader>`通常是空格`space`

## 文件操作

### 创建文件

normal 模式下

当前工作目录下新建文件 `:e newfile.txt`

当前工作目录下，指定目录下新建文件 `:e /tmp/newfile.txt`

这样会创建一个缓冲区，但文件还没有保存。编辑完成之后，再执行 `:w` 或者 `ctrl + s` 保存文件。

### 删除文件

normal 模式下 `:bd`

## 窗口操作

关闭当前窗口：`:q`或者`:close`

## explore窗口

打开关闭：`<leader>e`

## 打开命令行

normal 模式下 `ctrl + /`(推荐)

其他：
`: terminal`或者`<leader>fT`

## 分割新的窗口

normal 模式下 `: vsp` 或者 `: sp`

## 编辑

insert 模式下

接受 LSP 代码补全（completion）弹出的提示菜单：

- 回车 Enter：插入当前选中项（最常用）
- Ctrl + j / k：向下 / 向上（更高效）或者 上下方向键：↑ / ↓
