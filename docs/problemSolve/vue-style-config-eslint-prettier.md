# Vue 项目中保存的时候通过 Prettier 格式化代码，出现 eslint 报错解决办法

一般情况下通过 Vue 脚手架创建的项目如果带了 eslint 配置，就会严格按照 eslint 的配置进行工作和报错提示。

如果说在 Vscode 中的 settings.json 中自己配置了一些默认的格式化配置，但是在项目根目录中没有写 prettier 配置或者是和 eslint 的配置不符合，在保存的时候会爆出警告。
例如

```bash
Extra semicolon.
Strings must use singlequote.
```

解决办法就是在根目录中新建 prettier 配置，例如新建文件.prettierrc。写入配置：

```json
{
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "none",
  "semi": false
}
```

这样在保存的时候格式化的时候会优先读取项目中 prettier 配置没有的再读取 vscode 中 settings.json 中的配置
