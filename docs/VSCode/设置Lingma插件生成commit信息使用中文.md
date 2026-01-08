# 设置 Lingma 插件生成 commit 信息使用中文

## 全局修改

`Ctrl+,`打开设置，找到`Lingma`插件的设置，修改`Lingma.PreferredLanguage forCommitMessage`为`简体中文`

## 项目级修改

在项目的`.vscode`目录下创建`settings.json`，添加以下内容：

```json
"Lingma.PreferredLanguage forCommitMessage": "简体中文"
```
