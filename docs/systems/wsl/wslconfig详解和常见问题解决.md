# wslconfig 详解和常见问题解决

官方网址：<https://learn.microsoft.com/zh-cn/windows/wsl/wsl-config#wslconfig>

## 重启 wsl

运行`wsl --shutdown`命令关闭 wsl，关闭 shell 命令行窗口，等待 Linux 发行版的子系统完全停止运行（大约 8 秒）后，然后重新打开新的 shell 命令行输入`wsl`重新启动 wsl。

## 解决“wsl: 检测到 localhost 代理配置，但未镜像到 WSL。NAT 模式下的 WSL 不支持 localhost 代理”

### 方法一

去 WSL Settings 中的网络模块下下更改网络模式为 Mirrored，然后重启 wsl

### 方法二 (不推荐)

不推荐的原因是容易写错，比如多或者少一个空格之类的。操作：

在文件资源管理器的地址栏中输入：`%USERPROFILE%`。新建一个名为`.wslconfig`的文件，使用记事本或者 VS Code 打开，写入以下内容：

```txt
[wsl2]
networkingMode=mirrored
```
