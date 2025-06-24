# web 去除所有打包后的 url

公司项目用代码审查工具检测到项目中有 url 存在，说有风险，要求去除所有 url。

解决方案：

使用 loader 去除所有 url

写一个 plugin 插件，在打包结束时，将所有 url 删除。

TODO 待实现
