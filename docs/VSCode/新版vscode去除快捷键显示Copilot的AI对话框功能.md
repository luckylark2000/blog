# 新版 vscode 去除快捷键 Ctrl+I 显示 Copilot 的 AI 对话框

## 背景

更新 vscode 之后，`Ctrl+I` 快捷键会显示 Copilot 的 AI 对话框，但是原本`Ctrl+I`是用来进行属性提示的，所以需要取消这个 AI 对话框功能。

## 解决

参考连接：<https://vscode.js.cn/docs/copilot/setup#_remove-ai-features-from-vs-code>

### 统一用户配置（没有开通 Copilot 的用户推荐）

统一在 settings 中配置：取消勾选 disableAIFeatures

tips：打开设置快捷键：`Ctrl+,`

### 工作目录配置（已经开通 Copilot 的用户推荐）

在`.vscode/settings.json`中添加：

```json
{
  "chat.disableAIFeatures": true
}
```
