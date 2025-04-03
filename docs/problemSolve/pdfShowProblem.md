# 前端展示 PDF 文件的思考

## 使用成熟方案 vue-pdf

这个方案是比较成熟的方案，但是这个库没有维护了，使用的依赖也是pdf.js的库

缺点：

- 库不维护更新了
- 打包体积大
- 兼容性不好，需要使用 patch-package 来解决

## 直接使用pdf.js

优点，兼容性好一点，如果只是简单展示和代码量比较小，不是非常复杂的话，这个方案应该可以满足。

缺点：

- 需要自己写代码，比较麻烦
- 打包体积也不算小

## pdf转图片

前端转图片(不知道性能怎么样)

依赖库：

1. MuPDF 推荐这个 <https://mupdfjs.readthedocs.io/en/latest/>

2. PDFium 暂时不推荐，用的人比较少

后端转图片

js版本 <https://github.com/yakovmeister/pdf2image>

python 版本 <https://github.com/Belval/pdf2image>

## 实战组件

参考项目：<https://github.com/upthen/use-pdfjs-in-vue3>
给的示例还是挺清晰的。

运行注意：

- 需要在package.json中添加包`unplugin-auto-import`
- pnpm install
- pnpm dev即可

### 自己修改的Vue2版本

特点：

- src 传入的是base64编码的pdf，可以放在modal中频繁打开关闭
- 特殊字体加载配置
- 兼容性

组件需要传入的 src 是base64编码的pdf文件，这样频繁关闭和打开pdf文件不会出现白屏。如果想要支持url，可以自己修改一下。

```vue
<template>
  <div class="pdf-container" ref="pdfContainerRef">
    <canvas class="pdf-canvas"
      v-for="pageIndex in pdfPages"
      :id="`pdf-canvas-${pageIndex}`"
      :key="pageIndex"
    />
  </div>
</template>

<script>
import * as PDFJS from 'pdfjs-dist/es5/build/pdf.js'

export default {
  props: {
    src: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      pdfDoc:null,
      pdfPages:0,
      pdfScale:1.5
    }
  },
  created() {
    PDFJS.GlobalWorkerOptions.workerSrc = require('pdfjs-dist/build/pdf.worker.min.js')
    this.loadFile(this.src)
  },
  methods: {
    loadFile (url) {
      let data = atob(url)
      const loadingTask = PDFJS.getDocument({data, cMapUrl:'你自己的cmap文件地址', cMapPacked:true });
      loadingTask.promise
        .then(async (pdf) => {
          // pdf.loadingParams.disableAutoFetch = true;
          // pdf.loadingParams.disableStream = true;
          this.pdfDoc = pdf; // 保存加载的pdf文件流
          this.pdfPages = this.pdfDoc.numPages; // 获取pdf文件的总页数
          await this.$nextTick(() => {
            this.renderPage(1); // 将pdf文件内容渲染到canvas
          });
        })
        .catch((error) => {
          console.warn(`[upthen] pdfReader loadFile error: ${error}`);
        });
    },
    renderPage (num) {
      this.pdfDoc.getPage(num).then((page) => {
        page.cleanup();
        if (this.$refs.pdfContainerRef) {
          this.pdfScale = this.$refs.pdfContainerRef.clientWidth / page.view[2];
        }
        const canvas = document.getElementById(`pdf-canvas-${num}`);
        if (canvas) {
          const ctx = canvas.getContext("2d");
          const dpr = window.devicePixelRatio || 1;
          const bsr =
            ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio ||
            1;
          const ratio = dpr / bsr;
          const viewport = page.getViewport({ scale: this.pdfScale });
          canvas.width = viewport.width * ratio;
          canvas.height = viewport.height * ratio;
          canvas.style.width = viewport.width + "px";
          canvas.style.height = viewport.height + "px";
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
          const renderContext = {
            canvasContext: ctx,
            viewport: viewport,
          };
          page.render(renderContext);
          if (num < this.pdfPages) {
            this.renderPage(num + 1);
          }
        }
      })
    }
  },
}
</script>

<style lang="less" scoped>
.pdf-container {
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  .pdf-canvas {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
canvas + canvas {
  border-top: 10px solid #ccc;
}
</style>

```
