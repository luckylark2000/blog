# Node.js 与浏览器中的事件循环区别总结

学习一下Node.js 与浏览器中的事件循环区别，下面是AI生成的，感觉很有用,深受启发，就mark下来了

事件循环（Event Loop）是 JavaScript 实现异步非阻塞 I/O 的核心机制。虽然 Node.js 和浏览器都基于事件驱动模型，但由于运行环境和用途不同，它们的事件循环在实现细节、阶段划分和任务调度上存在显著差异。

---

## 📌 1. **实现基础不同**

| 环境     | 事件循环实现         |
|----------|----------------------|
| 浏览器   | 由浏览器引擎（如 V8 + Blink/WebKit）实现，规范由 [HTML 标准](https://html.spec.whatwg.org/multipage/webappapis.html#event-loops) 定义 |
| Node.js  | 基于 **libuv** 库实现，提供跨平台的异步 I/O 支持 |

> 💡 注意：V8 引擎本身不包含事件循环，它只负责执行 JS 代码；事件循环由宿主环境提供。

---

## 📌 2. **事件循环阶段划分**

### 🔹 浏览器事件循环（简化模型）

- **宏任务队列（Macro-task Queue）**：如 `setTimeout`、`setInterval`、I/O、UI 渲染等
- **微任务队列（Micro-task Queue）**：如 `Promise.then`、`queueMicrotask`、`MutationObserver`
- **执行顺序**：
  1. 执行一个宏任务
  2. 执行所有当前可用的微任务（清空微任务队列）
  3. 可能进行 UI 渲染
  4. 进入下一个宏任务

> ⚠️ 浏览器中没有明确的“阶段”概念，更注重任务类型（宏/微）的优先级。

---

### 🔹 Node.js 事件循环（libuv 模型，v11+ 与浏览器趋同但仍有差异）

Node.js 事件循环分为 **6 个主要阶段**：

| 阶段 | 说明 |
|------|------|
| **1. timers** | 执行 `setTimeout`、`setInterval` 的回调（满足时间条件时） |
| **2. pending callbacks** | 执行某些系统操作的延迟回调（如 TCP 错误） |
| **3. idle, prepare** | 内部使用，通常可忽略 |
| **4. poll** | 获取新的 I/O 事件；执行 I/O 回调（如文件读取、网络请求）；若 timers 到期，也可能跳回 timers 阶段 |
| **5. check** | 执行 `setImmediate()` 回调 |
| **6. close callbacks** | 执行关闭事件回调（如 `socket.on('close', ...)`） |

此外：

- **微任务**（`Promise.then`、`process.nextTick`）会在**每个阶段之间**执行
- `process.nextTick` 优先级**高于** Promise 微任务（这是 Node 特有）

---

## 📌 3. **关键行为差异**

| 特性 | 浏览器 | Node.js |
|------|--------|--------|
| **`setImmediate` vs `setTimeout(fn, 0)`** | 不支持 `setImmediate` | `setImmediate` 在 **check 阶段**，`setTimeout` 在 **timers 阶段**；通常 `setImmediate` 先于 `setTimeout(..., 0)`（但并非绝对） |
| **`process.nextTick`** | 不存在 | 会在**当前操作完成后立即执行**，甚至早于微任务，可能导致 I/O 饥饿 |
| **微任务执行时机** | 每个宏任务后清空微任务队列 | 每个事件循环阶段结束后执行微任务（包括 `nextTick` 和 Promise） |
| **I/O 处理** | 主要处理 DOM、网络、用户交互 | 处理文件系统、网络、子进程等系统级 I/O |
| **多事件循环实例** | 每个页面/Worker 有独立事件循环 | 单进程单事件循环（但可通过 Worker Threads 创建多个） |

---

## 📌 4. **示例对比**

```js
// 示例代码
setTimeout(() => console.log('timeout'));
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));
```

- **在浏览器中**：  
  输出顺序不确定（`timeout` vs `immediate` 不存在），但 `promise` 总是在 `setTimeout` 回调之前。

- **在 Node.js 中（主模块）**：  
  通常输出：

  ```txt
  promise
  immediate
  timeout
  ```

  > 因为首次进入事件循环时可能直接进入 poll 阶段，然后执行 check 阶段（`setImmediate`），之后才是下一轮的 timers。

---

## ✅ 总结

| 维度 | 浏览器 | Node.js |
|------|--------|--------|
| **目标** | 渲染页面、响应用户交互 | 高效处理服务器端 I/O |
| **规范** | HTML 标准 | libuv 实现 |
| **阶段** | 宏任务 / 微任务模型 | 明确的 6 阶段循环 |
| **特有 API** | `requestAnimationFrame` | `setImmediate`, `process.nextTick` |
| **微任务优先级** | Promise 为主 | `process.nextTick` > Promise |

> 🔄 虽然 Node.js v11+ 对齐了浏览器的微任务执行策略（每个阶段后清空微任务），但底层阶段机制和 API 差异仍导致行为不完全一致。

---

📚 **建议**：编写跨环境代码时，避免依赖 `setTimeout` 与 `setImmediate` 的执行顺序，优先使用 `Promise` 或显式控制异步流程。
