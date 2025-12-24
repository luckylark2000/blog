# 解决 WSL2 启用网络镜像模式后无网络设备问题

## 问题现象

在 Windows Subsystem for Linux 2 (WSL2) 中启用网络镜像模式 (networkingMode=mirrored) 后，用户发现 Linux 子系统内仅显示本地回环接口 (lo)，而缺少其他网络设备 (如 eth0)。这导致无法进行正常的网络通信。

就是输入 wsl 中 输入 `ip addr`，只有`lo`

## 解决

查了好多资料，都不对症。官方文档也读了好几遍，结果是一个没有想到的地方导致的无网络问题，本机禁用了 IPv6...

官方故障修复网址：[禁用 IPv6 时，WSL 没有网络连接](https://learn.microsoft.com/zh-cn/windows/wsl/troubleshooting#wsl-has-no-network-connection-when-disabling-ipv6)<https://learn.microsoft.com/zh-cn/windows/wsl/troubleshooting#wsl-has-no-network-connection-when-disabling-ipv6>

[在 Windows 中为高级用户配置 IPv6 的指南](https://learn.microsoft.com/zh-cn/troubleshoot/windows-server/networking/configure-ipv6-in-windows)

## 几个误区和注意点

- WSL2 不需要 Hyper-v
- 开启 mirror 模式只需要在系统搜索 WSL Settings，把网络模式改为 Mirrored 就行了，其它的不需要什么配置
- 修改 WSL Settings 的配置要重启 WSL，修改注册表要重启电脑
- 打开关闭代理（梯子）要重启
- 重启 WSL 时候，最好关闭 8 秒后，再启动
