# 玩转 VSCode 系列：关于 Git 的插件和 settings 配置

插件的话推荐使用 GitLens - Git supercharged，虽然说免费版阉割了一些功能，但是免费版提供的一些功能还是很 useful 的。

PS: 如果不介意打开其他应用的话，可以下载一个软件 source tree 还是比较好用的。

比如：

- 写代码的时候能够直接看到历史修改的记录
- 能够看到 stashes 的记录，放到 Source Control 面板下，看到具体修改了哪些。对于需要切换分支，暂存现有分支代码时，可以放到 stash 中，然后通过 stash pop 或者 stash apply 恢复。

默认情况下 左侧 Source Control 是没有 Outgoing 的。建议打开 scm.showOutgoingChanges

还有一个关闭（取消勾选）Gitlens.views.scm.grouped 里的 `Group the Stashes view(stashes)` 还有 `Group the Repositories view(Repositories)`，这样在 Source Control 面板下就会多出一个 Stashes（建议按照文件树的方式展开）和 Repositories 的视图
