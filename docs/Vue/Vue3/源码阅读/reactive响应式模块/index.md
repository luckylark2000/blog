# 响应式模块源码阅读

深入学习 reactivity 模块，我建议你按照这个路径，从简单到复杂逐步推进：

第一阶段：核心概念理解

先读 effect.ts - 这是响应式系统的心脏，理解 ReactiveEffect 类和依赖收集机制
然后看 dep.ts - 依赖管理和触发更新的逻辑
配合 tests/effect.spec.ts 的测试用例理解 effect 的行为
第二阶段：响应式对象

reactive.ts - 了解如何将普通对象转换为响应式
baseHandlers.ts - Proxy 的具体实现，这里是魔法发生的地方
collectionHandlers.ts - Map/Set 等集合类型的处理
测试用例：reactive.spec.ts
第三阶段：ref 和 computed

ref.ts - 基本值的响应式包装
computed.ts - 计算属性的实现
对应测试：ref.spec.ts 和 computed.spec.ts
调试技巧：

使用 benchmarks/ 中的性能测试了解各个 API 的性能特点
在 constants.ts 中了解各种标志位的含义
effectScope.ts 理解 effect 的生命周期管理
实战建议：
写一些小例子，在关键位置加 console.log，追踪数据流。比如创建一个响应式对象，然后修改它，看看 track/trigger 的调用链。
