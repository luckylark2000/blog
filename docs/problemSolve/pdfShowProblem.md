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