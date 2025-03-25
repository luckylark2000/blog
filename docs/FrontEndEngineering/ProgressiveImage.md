# 渐进式图片加载方案提高网站的性能和用户体验

渐进式的图片加载方案主要有两类：

- 方案一：就是通过先加载低质量体积较小的图片，等到高质量图片加载完成后再替换成高质量体积的图片
- 方案二：还有就是通过生成渐进式的图片，让图片自己由模糊变清晰

## 方案一

一句话说就是先加载模糊图，再加载原图，中间有一些过渡动画。

对网站性能优化有帮助，提高 FCP，LCP(一般首页轮播图就是最大元素)

实现方式：

- 自己使用 css 的 background-image 来实现

- 自己写一个组件来实现比如说：

```vue
<Img :highQSrc="xxx" :lowQSrc></Img>
```

- 其他参考方式

  参考方式
  vue2:<https://github.com/ccforward/progressive-image>
  vue3:<https://github.com/MatteoGabriele/vue-progressive-image>
  react:<https://github.com/FormidableLabs/react-progressive-image>

## 方案二

特殊格式的图片，浏览器兼容性可能不太好

使用一些库来生成渐进式的图片

生成方式参考：

- GraphicsMagick
- ps
- 在线转换工具

## 拓展

使用 picture 标签加上，一些低体积高质量的特殊图片格式

avif 格式，webp 格式，png 格式，jpg 格式

浏览器会自动加载符合特定标签格式的图片

相同质量的图片，版本比较高的浏览器，加载的图片更小，响应速度会更快。bilibili 就是这种方式
