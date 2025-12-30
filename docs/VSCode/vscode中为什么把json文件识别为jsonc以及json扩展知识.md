# vscode 中为什么把 json 文件识别为 jsonc 以及 json 扩展知识

vscode 中在编辑 json 文件的时候，会自动识别为 jsonc 文件，经常导致以下这类问题：

- 配置了 prettier 给 json 文件添加格式化功能，但是没有生效
- 自己在写 json 文件的时候加了注释，vscode 编辑器没有报错，但是项目运行的时候会报错

为什么呢？其实是因为 vscode 内部使用 jsonc 解析器来处理所有 json 文件

## json 扩展知识

json一般分为两种：

1. json 不支持注释，一般的库识别json文件的时候都是这种格式
2. jsonc 支持注释，一般只有编辑器或者各别库才会识别这种格式
