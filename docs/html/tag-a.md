# HTML 的 a 标签

## 作用

一般来说，你应该只使用超链接来导航到一个真正的 URL，否则请使用 button

## 属性

### href

超链接所指向的 URL。

示例：

```html
<!-- 点击该链接之后会在当前窗口跳转到百度官网 -->
<a href="http://www.baidu.com" rel="noopener noreferrer">百度</a>
```

### target

该属性指定在何处显示链接的 URL，作为浏览上下文的名称

- \_self：当前页面加载。（默认）
- \_blank：通常在新标签页打开，但用户可以通过配置选择在新窗口打开。
- \_parent：当前浏览环境的父级浏览上下文。如果没有父级框架，行为与 \_self 相同。
- \_top：最顶级的浏览上下文（当前浏览上下文中最“高”的祖先）。如果没有祖先，行为与 \_self 相同。

```html
<!-- 点击该链接之后会在新的窗口打开百度官网 -->
<a href="http://www.baidu.com" target="_blank" rel="noopener noreferrer">
  百度
</a>
```

### download

如果 a 标签有 download 属性，会导致浏览器将链接的 url 视为下载资源。download 可以不传值，也可以接受一个字符串当做文件名 filename（写不写扩展名都可以）。

- 如果没有指定值，浏览器会从多个来源决定文件名和扩展名：
  - Content-Disposition HTTP 标头。
  - URL 路径的最后一段。
  - 媒体类型。来自 Content-Type 标头，data: URL 的开头，或 blob: URL 的 Blob.type。
- filename：决定文件名的值。/ 和 \ 被转化为下划线（\_）。文件系统可能会阻止文件名中其他的字符，因此浏览器会在必要时适当调整文件名。

### hreflang

该属性用于指定所链接到的文档的人类语言。

### ping

包含一个以空格分隔的 URL 列表，当跟随超链接时，浏览器会发送带有正文 PING 的 POST 请求。通常用于跟踪。

### referrerpolicy

在跟随链接时，referrer 需要发送多少内容，可取值有：no-referrer, no-referrer-when-downgrade,origin,origin-when-cross-origin，same-origin，strict-origin，strict-origin-when-cross-origin，unsafe-url

### rel

该属性指定了目标对象到链接对象的关系。

### type

该属性指定在一个 MIME 类型链接目标的形式的媒体类型。没有内置的功能。

## 应用

- 链接跳转

- 文件流式下载

## 总结

a 标签的常用方式就是下载文件和链接跳转
