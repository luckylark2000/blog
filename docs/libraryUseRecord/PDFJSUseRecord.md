# PDFJS 使用问题记录

## 解决pdf预览时不显示签名图片的问题

解决pdf预览时不显示签名图片的问题
<https://github.com/kekingcn/kkFileView/pull/264/files>

## 签名和验签sdk

签名和验签sdk:<https://github.com/rootca-id/pkiwebsdk/blob/master/src/pdf.js>

## No "GlobalWorkerOptions.workerSrc" specified

<https://github.com/mozilla/pdf.js/issues/10478>

## How can I load only one or a few pages at one time? #8897

<https://github.com/mozilla/pdf.js/issues/8897>

## 使用方式

参考使用方式：

```js
import * as pdfJS from 'pdfjs-dist'
import * as pdfJSWeb from 'pdfjs-dist/web/pdf_viewer'
import 'pdfjs-dist/web/pdf_viewer.css'

const eventBus = new pdfJSWeb.EventBus();

const doc = await pdfJS.getDocument({
  url: activePdf.url,
}).promise

const page = await doc.getPage(pageNum)

const origViewport = page.getViewport({ scale: 1 })
const scale = wrapperSize.width / origViewport.width

const viewport = page.getViewport({ scale })

const pageView = new pdfJSWeb.PDFPageView({
  container: canvas,
  id: pageNum,
  scale: 1,
  defaultViewport: viewport,
  eventBus,
})

pageView.setPdfPage(page)

pageView.draw()
```

## 实战参考项目

基于PDFJS-DIST + CANVAS的PDF模板签字盖章定位工具

仓库地址：<https://gitee.com/twoke/pdf-template-signature-location>
