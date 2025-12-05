# axios的拦截器应该放在axios上还是axios.create的实例上

在使用 **axios 拦截器（interceptors）** 时，是应该挂载在 **全局的 `axios` 对象上**，还是挂载在 **通过 `axios.create()` 创建的实例上**，取决于你的项目架构和需求。以下是详细对比与建议：

---

## ✅ 一、两种方式的区别

### 1. **挂载在全局 `axios` 上**

```js
import axios from 'axios';

// 全局请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = 'Bearer xxx';
  return config;
});

// 全局响应拦截器
axios.interceptors.response.use(response => response, error => {
  // 统一错误处理
});
```

- **作用范围**：影响 **所有使用 `axios` 发起的请求**（包括第三方库内部调用）。
- **优点**：配置一次，全局生效。
- **缺点**：
  - 缺乏隔离性，可能干扰其他模块或第三方库；
  - 难以针对不同 API 域名/用途做差异化处理（如一个项目同时调用用户服务和支付服务）。

---

### 2. **挂载在 `axios.create()` 实例上**

```js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 5000,
});

apiClient.interceptors.request.use(...);
apiClient.interceptors.response.use(...);

// 所有请求都通过 apiClient 发起
apiClient.get('/users');
```

- **作用范围**：仅对该实例生效。
- **优点**：
  - **高内聚、低耦合**：每个 API 客户端可独立配置（baseURL、headers、拦截逻辑等）；
  - 更适合 **微前端、多后端服务、模块化架构**；
  - 避免污染全局 axios 行为；
  - 便于单元测试（可 mock 特定实例）。
- **缺点**：需要显式使用该实例，不能直接用 `axios.get(...)`。

---

## 🧩 二、推荐实践（最佳方案）

### ✅ **优先使用 `axios.create()` + 实例拦截器**

这是 **官方推荐** 且 **社区广泛采用** 的方式，尤其适用于中大型项目。

#### 示例：模块化 API 管理

```js
// api/user.js
import axios from 'axios';

const userApi = axios.create({ baseURL: '/api/user' });

userApi.interceptors.request.use(config => {
  config.headers.Authorization = localStorage.getItem('token');
  return config;
});

userApi.interceptors.response.use(
  res => res.data,
  err => Promise.reject(err)
);

export default userApi;
```

```js
// api/payment.js
const paymentApi = axios.create({ baseURL: 'https://payment.example.com' });
// 可配置不同的认证方式、超时、重试策略等
```

> 这样，用户模块和支付模块完全解耦，互不影响。

---

## ⚠️ 三、什么情况下可以用全局拦截器？

仅在以下场景考虑使用全局 `axios` 拦截器：

- 项目非常小，只有一个后端服务；
- 所有请求行为高度一致；
- 快速原型开发（PoC），不追求长期可维护性。

但即便如此，也**建议尽早迁移到实例化模式**，避免后期重构成本。

---

## 🔒 四、额外建议

1. **不要混用**：避免同时在全局和实例上设置拦截器，容易造成逻辑混乱或重复执行。
2. **拦截器顺序**：多个拦截器按注册顺序执行（request 拦截器是“栈”结构，response 是“队列”）。
3. **记得返回**：拦截器函数必须 `return config` 或 `return Promise.reject(error)`，否则请求会卡住。
4. **移除拦截器**：如需动态控制，可保存 handler 并调用 `eject`：

   ```js
   const reqInterceptor = instance.interceptors.request.use(...);
   instance.interceptors.request.eject(reqInterceptor);
   ```

---

## ✅ 总结

| 场景 | 推荐方式 |
|------|--------|
| 大中型项目、多后端服务、模块化 | ✅ `axios.create()` + 实例拦截器 |
| 小型项目、单一 API、快速验证 | ⚠️ 可用全局拦截器（但不推荐长期使用） |
| 第三方库可能使用 axios | ❌ 避免全局拦截器（防止副作用） |

> **结论：绝大多数情况下，应将拦截器绑定到 `axios.create()` 创建的实例上。**

这样代码更清晰、可维护性更高、扩展性更强。
