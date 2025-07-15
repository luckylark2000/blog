# VueUse 使用问题记录

useClipboard 剪贴板功能在 http 下访问无效，控制台也没有报错提示.

在 localhost 访问时，可以正常复制。

查看文档和MDN关于剪贴板功能的限制后，发现 document.clipboard 仅支持 https 协议和 localhost，useClipboard 默认使用 document.clipboard，所以无法在 http 的私有 host 下使用。

如果想在 http 下正常使用，需要给 useClipboard 传入 `legacy:true`，当不支持 document.clipboard 时，会自动降级处理。
