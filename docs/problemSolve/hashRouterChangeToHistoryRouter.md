# hash router 转换成 history router 的注意事项

## 先说一下基础的区别

外观上: hash router 的 url 是 `#/` 开头，history router 的 url 是 `/` 开头,history router是相对比较美观的
功能上: history router 可以使用 pushState 和 replaceState 来实现路由跳转，hash router 只能通过 hash 来实现路由跳转。
兼容性: hash router 兼容性更好;history router 兼容性差一点，需要做兼容性处理，比如兼容 IE9一下.
部署上: hash router 部署上相对简单，history router 可能会遇到刷新 404 问题,需要服务器把路由指向 index.html 文件。

## 实战 hash 转 history

基于 Vue 2.0 的项目

### publicPath 修改

**vue.config.js 里面 publicPath: './' 改成 publicPath: '/'.**

**index.html 里面如果引用了静态资源的路径相对路径的也得改为绝对路径。**

publicPath: 是 Vue CLI 的一个配置,用于指定静态资源的基础路径,会影响成成的HTML文件中静态资源的引用路径。

如果配置错误的话,会导致静态资源的引用路径错误,导致静态资源无法加载。也可能出现第一次访问时正常,刷新页面时静态资源访问 404 的情况。

publicPath: './'：

- 表示静态资源相对于当前 HTML 文件的路径。
- 适用于相对路径部署（如直接打开 HTML 文件或部署到子目录）。
- 常用于 Hash Router，因为 Hash Router 通常不需要服务器支持。

publicPath: '/'：

- 表示静态资源相对于服务器根路径的路径。
- 适用于绝对路径部署（如部署到服务器根目录）。
- 更适合 History Router，因为 History Router 的 URL 是基于根路径的。

### 配置服务器支持 History Router

History Router 需要服务器将所有未匹配的路径重定向到 index.html，以避免 404 错误。

```Nginx
location / {
  try_files $uri /index.html;
}
```
