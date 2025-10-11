# vscode 从 1.93 版本开始去除了 incoming 和 outgoing 的原因以及替代方案

最近升级了一下 vscode，发现 incoming 和 outgoing 功能被取消了，并且被替换成了 Graph。Graph 功能和之前的 incoming/outgoing 对比完全就是一坨。

## 对比

push 之前和 fetch 之后的有 incoming/outgoing 的话，会直接在 Changes 代码下方悬浮显示本地 commit 的记录，还有 fetch 的代码记录，对比代码很方便，而且如果 fetch 和 push 之后如果本地和远程是一致的话，就不会显示 incoming/outgoing，就显得很干净和智能。

而 Graph 只是对本地和远程的 commit 记录差异做了一个颜色区分。而且会把所有的 commit 都显示出来，看得眼花缭乱得。

而且多个 workspace 的时候，之前 incoming/outgoing会在每个 Changes 代码下方悬浮显示，有几个就显示几个。Graph 只能显示一个工作空间，如果要切换，还得自己手动切换，有点麻烦。

## 替代方案

我自己升级之后觉得 Graph 功能还是不够智能，于是自己浏览了好几遍 settings，看看有什么配置可以恢复，但是没找到，也查了很多的资料，也没找到关于高版本 vscode 恢复 incoming/outgoing 的方法。

最后去 vscode 的 github 找了一下 issue，找到了一个 issue，<https://github.com/microsoft/vscode/issues/227727>，里面有去除 incoming/outgoing 的说明，也有替代方案。

原文是：Git 内置扩展中已停用的功能利用了提议的 API，因此后来决定不再最终确定该 API。API 一旦最终确定，就会产生永久的支持开销，这就是为什么一些提议的 API 会被放弃的原因。

也就是说 incoming/outgoing 功能被取消的原因是 incoming/outgoing 这个功能只是实验性的功能，后来在 1.93 版本被官方最终决定去除了。

没想到会删除一个这么有用的实验性功能，真是太可惜了。

如果大家不能接受的话，可以考虑安装 1.92.2 之前的版本

替代方案的话就是使用 Gitlens, 是免费的，需要设置

```json
// settings.json
"gitlens.views.scm.grouped.views": {
  "repositories": false
},
```

这样就会在 source control 里面显示的单独的 REPOSITORIES, 里面可以显示 Outgoing 和 Incoming（如果有的话）

## 展望

计划找/写一个插件，功能和之前 incoming/outgoing 一样。
