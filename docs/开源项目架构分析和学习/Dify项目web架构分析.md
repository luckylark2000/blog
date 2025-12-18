# Dify 项目 web 端架构分析

## 依赖分析

package.json 地址：<https://github.com/langgenius/dify/blob/main/web/package.json>

## 框架分析

使用 nextjs

## UI 库

未使用主流 UI 组件库，使用的是 `Tailwind CSS + Headless UI + Icon 库 + 自定义封装`

属于当前`高定制化项目`的主流做法，极致定制，无冗余组件，不依赖 UI 库大版本迁移，设计系统统一，与 Tailwind 深度集成

高成熟度前端团队的标志性做法，适合对品牌、性能、体验有强控制需求的产品

## 工具

拖拽：sortablejs，react-sortablejs

流程图：react flow

## 为什么

### 为什么使用 tailwindcss

AI Code 友好
