# playwright 处理组件库上传组件 input 的 display 为 none 怎么处理上传逻辑

## 方法一

找到该组件然后使用`.locator('input[type="file"]')`拿到该组件的 input，然后使用`setInputFiles`方法设置上传的文件。

setInputFiles，支持本地文件路径，或者文件对象。也支持代码生成的文件对象，具体可以查看官方 api 文档。

如果想要自己生成一个简单的图片的话呢，可以使用 `jimp` 这个库。

详细使用方法可以查看官方文档，我这边也有一份教程，在仓库`docs\libraryUseRecord\使用jimp库生成图片.md`
