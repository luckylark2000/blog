# AI辅助代码解释器设计文稿

功能：

在网页上选中一段 代码(JavaScript / CSS / HTML等) → 右键 → “AI 解释这段代码”

调用大模型 API（如 通义千问等）返回自然语言解释

实现：

技术栈：Chrome Extension API + Fetch + 大模型 API
