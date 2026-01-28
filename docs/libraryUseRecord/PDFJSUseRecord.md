# PDFJS 使用问题记录

## 解决 pdf 预览时不显示签名图片的问题

解决 pdf 预览时不显示签名图片的问题
<https://github.com/kekingcn/kkFileView/pull/264/files>

## 签名和验签 sdk

签名和验签 sdk:<https://github.com/rootca-id/pkiwebsdk/blob/master/src/pdf.js>

## No "GlobalWorkerOptions.workerSrc" specified

<https://github.com/mozilla/pdf.js/issues/10478>

## How can I load only one or a few pages at one time? #8897

<https://github.com/mozilla/pdf.js/issues/8897>

## 使用方式

参考使用方式：

```js
// 可能是旧版 pdf.js
import * as pdfJS from "pdfjs-dist";
import * as pdfJSWeb from "pdfjs-dist/web/pdf_viewer";
import "pdfjs-dist/web/pdf_viewer.css";

const eventBus = new pdfJSWeb.EventBus();

const doc = await pdfJS.getDocument({
  url: activePdf.url,
}).promise;

const page = await doc.getPage(pageNum);

const origViewport = page.getViewport({ scale: 1 });
const scale = wrapperSize.width / origViewport.width;

const viewport = page.getViewport({ scale });

const pageView = new pdfJSWeb.PDFPageView({
  container: canvas,
  id: pageNum,
  scale: 1,
  defaultViewport: viewport,
  eventBus,
});

pageView.setPdfPage(page);

pageView.draw();
```

需要引入 pdf.worker.js 并且 webpack 的话需要 worker-loader 来处理 worker，Vite 的话是直接支持的。

### vite项目中如何导入和使用

使用最新的 pdf-dist 版本是 5.4.530

三种方法加载 worker

```js
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
// 方式一
import PdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?worker&inline'
GlobalWorkerOptions.workerPort = new PdfjsWorker()

// 方式二
// GlobalWorkerOptions.workerPort = new Worker(
//   new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url),
//   {
//     type: 'module',
//   },
// )

// 方式三
// GlobalWorkerOptions.workerSrc = 'your-path/pdf.worker.mjs'
```

### 其他使用方式

推荐使用 pdf-dist 包的 web 模块。特别是`PDFViewer`(里面的setDocument好像可以传容器自动创建和加载PDF,待探索)

## 实战参考项目

基于 PDFJS-DIST + CANVAS 的 PDF 模板签字盖章定位工具

仓库地址：<https://gitee.com/twoke/pdf-template-signature-location>

## 直接使用 sdk

就是直接再官网下载人家弄好的 sdk 包，然后放到`public`文件夹下面。启动的时候就可以直接使用 viewer.html 来加载 pdf 文件了

一些技巧就是 file 这个 ULR query 参数的问题,如果用`.../viewer.html?file=`这种方式访问文件的话，后面跟的是一个真实的 url 地址。如果用`.../viewer.html#file=`这种使用 hash 方式的话，后面跟的是一个 path 路径，就是省略了这个协议、域名和端口号之后的访问这个 pdf 的 URL 的 path。

## codepen 中参考项目

[PDFJS预览](https://codepen.io/sivadass/details/XZEVmM)
[带缩放的PDFJS预览](https://codepen.io/TheDarkSid4r/pen/gydapP)

## 常见问题

### 官方插件问题整理

遇事不决看官方 wiki:<https://github.com/mozilla/pdf.js/wiki>

#### 分块按需加载 PDF

地址：<https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#range>

核心实现方式依靠**浏览器支持**加上 **HTTP 的 Range 请求头**，PDF.js会自动将PDF文件分割成多个块，然后请求这些块，最后将这些块组合成完整的PDF文件。

### 其他问题

#### Vue3中使用响应式数据绑定pdfDoc会报`Cannot read from private field`

参考文章：[【Vue】vue3.2中使用pdf.js踩坑：Cannot read from private field---pdf.js使用详解](https://blog.csdn.net/weixin_42960907/article/details/127366807)

核心解决方式是：`pdfDoc.getPage`的`pdfDoc`不要使用响应式写法！！！直接使用`let pdfDoc = null`来初始化即可。

原因的话简单来说就是`Vue3`里面用`Proxy`来实现的数据响应式，而在`pdf-dist`里面有些步骤会对数据进行拦截校验，拦截到是一个`Proxy`对象，导致校验不通过。详细原因的话可以看上面这篇文章，

## 参考文章

[vue3中借助 pdfjs-dist 实现pdf文件展示、文本选中功能及使用过程中部分问题处理](https://blog.csdn.net/qq_45897239/article/details/136063330)

[pdfjs viewer 实战指南](https://juejin.cn/post/7486751851070406708)
