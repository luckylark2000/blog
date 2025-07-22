# 不用再为使用 svg 安装插件和 loader 了，Vite + Vue3 原生就支持，并解决 svg 颜色问题

vite 项目中导入 svg 图标，一开始查的资料，普遍都说要安装 vite-plugin-svg-icon 或者 vite-svg-loader 之类的。

但是我看了一下这两个项目的 star 数和 issue，发现 star 不是很多，issue 也有不少没关闭的，可能比较致命的 bug，比如：有的包安装之后会导致打包速度变慢很多；有的会出现页面使用多个相同的 svg 图标，会报错之类的。

后面我查 Vite 文档的时候发现，Vite 默认支持raw-loader的只需要再import 的时候加上`?raw`。


## 解决颜色问题

默认情况下，svg 图标会继承父元素的颜色，所以说，如果我们想要自定义svg的颜色我们只需要把下载下来 的 svg 图标里面所有 fill 属性删除，然后在svg的父元素设置 color css 属性即可。

PS: 只需要删除想要自定义颜色的 fill 属性即可，如果有些区域颜色想要写死的，不用删。
