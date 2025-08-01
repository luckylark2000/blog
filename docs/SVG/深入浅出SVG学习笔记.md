# SVG 深入浅出学习笔记

## 基本结构

- 根元素：`<svg>`
- 图形元素：`<path>`，`<rect>`，`<circle>`，`<line>`
- 文本元素：`<text>`
- 分组元素：`<g>`
- 样式元素：`<style>`
- 属性：`fill`，`stroke`，`stroke-width`，`d`，位置属性：`x`，`y`，矩形属性：(`width`，`height`)，圆形属性：`cx`，`cy`，`r`
- 其他元素和属性：`<line>`、`<polygon>`、`<ellipse>`

## 文档结构和语法

### 命名空间

SVG 使用命名空间是为了解决在 XML 文档中的元素冲突问题，以及为了支持模块化、扩展性和跨平台的标准化。

SVG 命名空间确保了 XML 文档中的元素和属性的唯一性和一致性，使得 SVG 可以灵活地集成到各种 XML 文档和 Web 环境中。

显式添加 xmlns 属性（为 SVG 文档显式声明命名空间），确保 svg 元素及其所有后代元素都属于 SVG 命名空间：

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
    <!-- SVG元素和内容 -->
</svg>
```

xmlns:xlink 的作用是声明 xlink 命名空间，以便在 SVG 文档中使用 XLink 相关的属性，如 href，来定义超链接和链接行为。

例如：
```svg
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100" height="100">
    <a xlink:href="https://www.example.com" target="_blank">
        <circle cx="50" cy="50" r="40" fill="red" />
    </a>
</svg>
```

### svg 元素通用属性

- id：为元素定义一个唯一的标识符，方便后续引用和操作。
- class：为元素定义一个或多个类名，用于样式化元素。
- style：为元素定义内联样式，覆盖类样式。
- transform：为元素定义变换，如旋转、缩放、平移等。
- fill：为元素定义填充颜色。
- stroke：为元素定义描边颜色。
- stroke-width：为元素定义描边宽度。
- 等等......

## 获取SVG

图标可以通过网站获取

自己设计

动态生成 SVG的知名的库有：

- ECharts
- D3.js
- SVG.js
- Snap.svg
- Two.js

## SVG 使用

### 在 img 标签中使用

SVG 文件中的任何脚本、外部样式表、链接和其他 SVG 交互性都将被禁用。

值得注意的是，如果 svg 中没有指明宽度和高度，那么通过img来加载svg的max-width默认是0，svg元素会被隐藏。

这时，可以通过设置img的max-width为100%来显示svg元素，或者通过设置svg的width和height属性来指定svg的宽高。

### picture 标签中

picture 标签也可以用来加载svg

```html
<picture>
    <source type="image/svg+xml" srcset="path/to/image.svg">
    <img src="path/to/fallback-1x.png" srcset="path/to/fallback-2x.png 2x, path/to/fallback-3x.png 3x" alt="Image description">
</picture>
```

### 其他标签

`<iframe>` 、`<object>` 和 `<embed>`中都可以加载svg

### 直接在html中使用

`<svg>`标签可以直接在html中使用

### CSS 中使用SVG

一些可以是image属性的CSS属性可以通过 url() 函数引用图像，例如我们熟悉的 background-image 、border-image-source 、list-style-image 、mask-image 、clip-path 、shape-outside 、offset-path 、cursor 、content 和 filter 等。这些属性都可以使用SVG

## SVG 坐标系统

左上角为原点，X轴向右，Y轴向下。

常用 `transform` 属性来进行移动、缩放、旋转、倾斜等

### viewBox 属性

常用来设置 SVG 元素的视口大小。
`viewBox="x y width height"`
`x`和`y`定义视图窗口的左上角 x 坐标。
`width`和`height`定义视图窗口的宽度和高度。

### preserveAspectRatio 属性

preserveAspectRatio 属性用于控制 SVG 中的 viewBox 在视口中的缩放和定位。

## 基本图形元素

矩形（`<rect>`）、圆（`<circle>`）、椭圆（`<ellipse>`）、直线（`<line>`）、开放式线段（`<polyline>`）、多边形（`<polygon>`）、路径（`<path>`）元素等

第七节，未完
