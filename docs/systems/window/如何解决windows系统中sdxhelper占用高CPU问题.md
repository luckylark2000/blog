# 如何解决 windows 系统中 Microsoft Office SDX Helper 占用高 CPU 问题

快捷键 Ctrl + Shift + Esc 打开任务管理器，进程面板下按照CPU降序排列，
可以看到常年霸榜前几位的就是 Microsoft Office SDX Helper 进程还有 Microsoft Defender 防病毒服务进程。就算啥也没做的话，这两个进程占用的 CPU 就会不少，大约 7-8% 的样子。

第一个 Microsoft Office SDX Helper 可以关闭，第二个 Microsoft Defender 防病毒服务进程不建议关闭，防病毒属于系统自带的保护电脑的服务。

## 介绍一下 Microsoft Defender 防病毒服务进程

Microsoft Office SDX Helper（通常进程名为 OfficeClickToRun.exe 或 SDXHelper.exe）是 Microsoft Office Click-to-Run 安装机制的一部分，主要用于后台更新、许可证验证、遥测数据收集等功能。它属于 Office 的现代部署方式（尤其是通过 Microsoft 365 订阅安装的 Office 套件）。

为什么它会持续占用 CPU ？可能原因包括：

- 正在进行后台更新：Office 可能正在检查或下载更新。
- 遥测/诊断数据上传：Office 会定期向 Microsoft 发送使用情况和诊断信息。
- 许可证验证：如果你使用的是订阅版（Microsoft 365），它会定期验证账户状态。
- Bug 或异常行为：某些版本存在已知问题，导致 SDX Helper 持续高负载。
- 与其他软件冲突：例如杀毒软件、系统优化工具等干扰其正常运行。

## 关闭 Microsoft Office SDX Helper

会触发 Microsoft Office SDX Helper 进程的主要是 Office 的任务计划程序，打开任务计划程序：

windows + r 输入：taskschd.msc

在左侧面板依次展开：

```txt
任务计划程序库 → Microsoft → Office
```

可以看到一些 带 `Updates`的任务：

- Office Automatic Updates 2.0
- Office Feature Updates
- Office Feature Updates Logon

针对这几个任务鼠标右键，选择 `禁用`

一般需要重启电脑才会生效

**正版 Office 重度用户，电脑没有卡顿，没有执行一些 CPU 占用高的任务，不建议禁用这个，以防 Office 不可用**。或者可以收藏一下这篇文章，万一禁用之后还可以参考这篇文章给重新启动这个服务

## 结语

按需禁用，如果平常做一些 CPU 占用高的任务，电脑有卡顿，可以禁用掉这些。
