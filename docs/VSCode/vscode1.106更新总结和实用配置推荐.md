# vscode1.106更新总结和实用配置推荐

## 更新内容

根据官方提供的 **Visual Studio Code 1.106（2025年10月版）** 的发布说明，本次更新围绕三大核心方向展开：**Agent HQ（智能代理中心）**、**安全性与信任机制**、以及**更流畅的编辑体验**。以下是核心更新内容的结构化总结：

---

### 一、Agent HQ：统一管理 AI 编码代理

- **Agent Sessions 视图**  
  - 默认启用，集中展示本地（VS Code 内）和远程（如 Copilot CLI、Codex）的所有活跃代理会话。
  - 支持搜索（Ctrl+Alt+F），可配置为单视图模式（位于 Secondary Side Bar）。
- **Plan Agent（规划代理）**  
  - 在编码前引导用户拆解复杂任务，生成可审核的实施计划，减少返工。
  - 支持自定义 Plan Agent，适配团队工作流。
- **Cloud & CLI 代理集成增强**  
  - Copilot 编码代理从 GitHub PR 扩展迁移至 Copilot Chat 扩展，体验更原生。
  - 初步支持 Copilot CLI 代理，在终端或编辑器中创建/恢复会话。
  - 支持通过 `/delegate` 命令将任务委派给云代理。
- **编辑追踪**  
  - 后台代理（如 Copilot CLI）所做的修改，会在内联编辑标记和工作区视图中清晰显示。

---

### 二、安全与信任机制升级

- **工具审批机制优化**  
  - **事后审批（Post-approval）**：对 `#fetch` 和声明了 `openWorldHint` 的 MCP 工具，允许用户在数据使用前审核。
  - **批量信任**：可一次性信任某个 MCP 服务器或扩展下的所有工具。
- **终端命令安全增强（实验性）**  
  - 使用 Shell 语法解析器（支持 Bash/PowerShell），精准识别子命令和文件重定向。
  - 新增设置可阻止自动批准写入工作区外的文件（`chat.tools.terminal.blockDetectedFileWrites`）。
- **组织级 MCP 管理**  
  - 支持通过 GitHub 组织策略配置私有 MCP 注册表，限制可用服务器。

---

### 三、编辑器体验优化

- **代码编辑**
  - **Diff 编辑器**：支持选择并复制已删除的代码行。
  - **Go to Line (Ctrl+G)**：新增 `::字符偏移量` 跳转（如 `::599`），支持负数定位行尾。
  - **内联建议开源**：GitHub Copilot 内联建议代码已开源，并合并到 Copilot Chat 扩展中。
  - **内联建议暂停**：可通过 gutter 图标一键“小睡”建议。
- **UI/UX 改进**
  - 全新 **Codicon 图标集**，更现代、易读。
  - **诊断信息**：悬停错误提示时可一键复制完整信息。
  - **命令面板**：支持忽略重音符号搜索（如输入 `generer` 可匹配 `Générer`）。
  - **高级设置**：默认隐藏，可通过 `@tag:advanced` 过滤查看。
- **终端（Terminal）**
  - **Terminal IntelliSense 正式发布**：为 PowerShell/Bash/Zsh/Fish 提供智能补全（需启用 Shell Integration）。
  - **命令上下文共享**：可将终端命令及其输出直接附加到聊天中作为上下文。
- **源代码管理（Git）**
  - **提交信息折叠**：在编辑器中撰写长提交信息时可折叠段落。
  - **图形化分支对比**：Source Control Graph 新增“传入/传出更改”节点，并支持任意引用对比。

---

### 四、其他亮点

- **Python 开发增强**  
  - 支持将 Copilot Hover 摘要一键插入为 docstring。
  - 支持 `dev-requirements.txt` 自动安装。
  - 新增“转换通配符导入”代码操作。
- **无障碍（Accessibility）**  
  - 语音会话默认不再自动超时。
  - 聊天输入对屏幕阅读器更友好。
- **扩展开发（Extension Authoring）**  
  - 支持在 Secondary Side Bar 注册视图容器。
  - Quick Pick API 新增切换按钮、提示文本、文件图标等能力。
  - TreeItem 标签支持 Markdown（含图标和格式）。

---

### 总结

VS Code 1.106 是一次以 **AI 编程代理为中心** 的重大更新，通过 **Agent HQ** 实现了对多来源智能代理的统一调度与监控，同时大幅强化了 **安全控制** 与 **开发者体验**，标志着 VS Code 正加速向“AI 原生编辑器”演进。

## 更新重点和配置推荐

### 启用 Terminal IntelliSense（终端智能补全） 功能

1. 使用 PowerShell/Bash/Zsh/Fish 终端
2. 打开 VS Code 的设置界面（Ctrl+，）。
3. 确认 terminal.integrated.shellIntegration.enabled 为 true，terminal.integrated.suggest.enabled 为 true
4. 重新启动 VS Code，重启 PowerShell/Bash/Zsh/Fish 终端

### CTRL + G 跳转到指定行数

### 支持选择并复制已删除的代码行

### 悬停错误提示时可一键复制完整信息
