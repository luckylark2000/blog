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

## 实战参考项目

基于 PDFJS-DIST + CANVAS 的 PDF 模板签字盖章定位工具

仓库地址：<https://gitee.com/twoke/pdf-template-signature-location>

## 直接使用 sdk

就是直接再官网下载人家弄好的 sdk 包，然后放到`public`文件夹下面。启动的时候就可以直接使用 viewer.html 来加载 pdf 文件了

一些技巧就是 file 这个 ULR query 参数的问题,如果用`.../viewer.html?file=`这种方式访问文件的话，后面跟的是一个真实的 url 地址。如果用`.../viewer.html#file=`这种使用 hash 方式的话，后面跟的是一个 path 路径，就是省略了这个协议、域名和端口号之后的访问这个 pdf 的 URL 的 path。
