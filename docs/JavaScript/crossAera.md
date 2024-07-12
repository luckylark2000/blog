# 跨域

## 同源策略

协议、域名、端口号必须相同

## 跨域的解决方案

后端 CORS

前端开发：做代理

link、img、script 可以跨域

jsonp 原理就是利用 script 可以跨域

`<img/>`可以用于统计打点，可使用第三方服务统计
`<link/>`、、`<script/>`可以使用 CDN，CDN 一般都是外域
`<script/>`可以实现 jsonp

> 注意

- 所有的跨域，都必须经过 server 端允许和配合
- 未经 server 端允许就实现跨域，说明浏览器有漏洞，危险信号

### JSONP 实现

- `<script/>`可以绕过同源策略
- 服务器可以任意动态拼接数据返回
- `<script/>`可以获取跨域的数据，只要服务端愿意返回

jQuery 实现 jsonp

```js
$.ajax({
  url: "http://localhost:8882/x-origin. json",
  dataType: "jsonp",
  jsonpCallback: "callback",
  success: function (data) {
    console.log(data);
  }
});
```
