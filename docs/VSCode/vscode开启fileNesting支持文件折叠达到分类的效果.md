# vscode开启 fileNesting 支持文件折叠达到分类的效果

启发是 Vite 创建的 Vue Official 官方功能

实现方式是：创建一个 .vscode/settings.json 文件，内容如下：

```json
{
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "vue.config.*": "jsconfig*, jest.config.*, vitest.config.*, cypress.config.*, playwright.config.*",
    "package.json": "package-lock.json, pnpm*, babel.config.*, .yarnrc*, yarn*, .eslint*, eslint*, .oxlint*, oxlint*, .prettier*, prettier*, .editorconfig",
    ".env": ".env.*"
  }
}

解释一下：
"explorer.fileNesting.enabled": true 是用来启用文件嵌套功能


