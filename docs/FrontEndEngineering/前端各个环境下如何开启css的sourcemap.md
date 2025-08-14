# 前端各个环境下如何开启 CSS 的 sourcemap 建立源映射

解决痛点：源码和浏览器中展示的 css 定位不一致

优点：CSS错误定位更准确

特别是大型项目，微前端项目中

## webpack 中

直接在各个loader的options中添加 `sourceMap: true`

sass-loader：<https://github.com/webpack-contrib/sass-loader?tab=readme-ov-file#sourcemap>

## Vite 中

开发环境开启css的sourcemap

<https://vitejs.cn/vite6-cn/config/shared-options.html#css-devsourcemap>

## vue-cli 中

<https://cli.vuejs.org/zh/config/#css-loaderoptions>
