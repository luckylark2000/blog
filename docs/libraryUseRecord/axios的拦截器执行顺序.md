# axios 拦截器的执行顺序

在 **axios** 中，当你注册了多个 **请求拦截器（request interceptors）** 和 **响应拦截器（response interceptors）** 时，它们的执行顺序是有明确规则的。理解这个顺序对调试、错误处理和逻辑组织非常重要。

---

## ✅ 一、请求拦截器（Request Interceptors）的执行顺序

> **先注册的后执行（LIFO：Last In, First Out）**

### 示例

```js
axios.interceptors.request.use(config => {
  console.log('请求拦截器 1');
  return config;
});

axios.interceptors.request.use(config => {
  console.log('请求拦截器 2');
  return config;
});
```

### 发起请求时输出

```txt
请求拦截器 2
请求拦截器 1
```

### 原因

- 请求拦截器被压入一个 **栈（stack）**；
- 在发送请求前，从 **栈顶开始弹出并执行**；
- 所以后注册的拦截器 **先执行**。

> 💡 类比：像“穿衣服”——先穿内衣（第一个注册），再穿外套（第二个注册）；出门时先看到的是外套（先执行）。

---

## ✅ 二、响应拦截器（Response Interceptors）的执行顺序

> **先注册的先执行（FIFO：First In, First Out）**

### 示例

```js
axios.interceptors.response.use(res => {
  console.log('响应拦截器 1');
  return res;
});

axios.interceptors.response.use(res => {
  console.log('响应拦截器 2');
  return res;
});
```

### 收到响应时输出

```txt
响应拦截器 1
响应拦截器 2
```

### 原因

- 响应拦截器被放入一个 **队列（queue）**；
- 从服务器返回响应后，按 **注册顺序依次执行**。

> 💡 类比：像“脱衣服”——先脱外套（最后穿的），再脱内衣（最先穿的）；但 axios 的响应拦截器是反向“穿衣”逻辑，所以按注册顺序执行。

---

## 🔄 三、完整流程图解（单个请求）

假设你注册了两个请求拦截器（R1, R2）和两个响应拦截器（S1, S2）：

```js
// 注册顺序
R1 → R2
S1 → S2
```

### 执行顺序为

```txt
调用 axios.get()
    ↓
[请求阶段]
R2 (后注册，先执行)
R1 (先注册，后执行)
    ↓
发送 HTTP 请求 → 服务器处理 → 返回响应
    ↓
[响应阶段]
S1 (先注册，先执行)
S2 (后注册，后执行)
    ↓
Promise resolve / reject
```

---

## 🧪 四、实际代码验证

```js
import axios from 'axios';

// 请求拦截器
axios.interceptors.request.use(config => {
  console.log('R1');
  return config;
});
axios.interceptors.request.use(config => {
  console.log('R2');
  return config;
});

// 响应拦截器
axios.interceptors.response.use(res => {
  console.log('S1');
  return res;
});
axios.interceptors.response.use(res => {
  console.log('S2');
  return res;
});

// 发起请求
axios.get('https://httpbin.org/get').then(() => {
  console.log('Done');
});
```

### 控制台输出

```txt
R2
R1
S1
S2
Done
```

---

## ⚠️ 五、注意事项

1. **每个 `axios.create()` 实例有独立的拦截器栈/队列**  
   全局 `axios` 和实例 `myApi` 的拦截器互不影响。

2. **拦截器必须 return 或 throw**  
   - 请求拦截器：必须 `return config` 或 `return Promise.reject(error)`
   - 响应拦截器：必须 `return response` 或 `return Promise.reject(error)`

3. **错误处理拦截器也遵循相同顺序**  
   如果使用 `interceptors.request.use(onFulfilled, onRejected)`，错误处理函数的执行顺序与成功处理一致。

4. **可通过 `eject` 动态移除拦截器**  

   ```js
   const id = axios.interceptors.request.use(...);
   axios.interceptors.request.eject(id);
   ```

---

## ✅ 总结

| 拦截器类型       | 执行顺序         | 数据结构 |
|------------------|------------------|--------|
| 请求拦截器（Request） | **后注册 → 先执行** | 栈（LIFO） |
| 响应拦截器（Response）| **先注册 → 先执行** | 队列（FIFO） |

> 📌 记忆口诀：**“请求倒着走，响应顺着来”**

合理利用这个机制，可以构建如：

- 请求：token 注入 → 日志记录 → 加密
- 响应：统一错误处理 → 数据格式化 → 埋点上报

这样的分层拦截逻辑。

## 其他参考文章

`docs\ArchitectThinking\axios的拦截器应该放在axios上还是axios.create的实例上.md`
