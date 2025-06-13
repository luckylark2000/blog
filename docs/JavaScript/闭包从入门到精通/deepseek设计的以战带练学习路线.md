### 实战驱动的JavaScript闭包精通计划（面向2年前端开发者）

#### 核心原则：**以战代学，问题驱动**
> 通过7个渐进式实战项目，在解决实际问题中掌握闭包精髓

---

### 第一阶段：基础巩固（1天）
**目标**：重新理解闭包本质，建立正确心智模型

#### 实战任务 1：闭包诊断室
```javascript
// 问题代码修复（闭包经典陷阱）
function initButtons() {
  for (var i = 1; i <= 5; i++) {
    var btn = document.createElement('button');
    btn.textContent = 'Button ' + i;
    btn.addEventListener('click', function() {
      console.log('Clicked button: ' + i);
    });
    document.body.appendChild(btn);
  }
}
// 所有按钮都输出 "Clicked button: 6"
```
**任务要求**：
1. 用三种不同方案修复（IIFE、let、闭包工厂）
2. 使用Chrome DevTools调试查看闭包作用域链
3. 性能对比三种方案（JSBench.me）

---

### 第二阶段：工程应用（2-3天）
**目标**：掌握闭包在真实项目中的应用场景

#### 实战任务 2：模块化缓存系统
```javascript
function createApiCache(fetchFn, ttl = 30000) {
  // 你的代码
}

// 使用示例
const cachedFetch = createApiCache(fetch);
cachedFetch('/api/users').then(...); // 首次真实请求
cachedFetch('/api/users').then(...); // 30秒内返回缓存
```
**实现要求**：
1. 缓存最近5个请求结果
2. TTL过期自动失效
3. 支持强制刷新参数 `cachedFetch(url, {force: true})`
4. 内存泄漏防护（WeakMap）

#### 实战任务 3：React Hooks闭包模拟
```javascript
function useState(initialValue) {
  // 你的实现
}

// 测试用例
function Counter() {
  const [count, setCount] = useState(0);
  
  return {
    click: () => setCount(count + 1),
    log: () => console.log(count)
  };
}

const counter = Counter();
counter.log(); // 0
counter.click();
counter.log(); // 1
```

---

### 第三阶段：高级模式（3-4天）
**目标**：掌握函数式编程中的闭包高阶应用

#### 实战任务 4：函数组合工厂
```javascript
function createPipeline(...fns) {
  // 你的实现
}

// 使用示例
const sanitizeInput = createPipeline(
  str => str.trim(),
  str => str.replace(/</g, '&lt;'),
  str => str.slice(0, 100)
);

sanitizeInput('   <script>alert(1)</script>   '); 
// 输出 "&lt;script&gt;alert(1)&lt;/script&gt;"
```

#### 实战任务 5：状态机实现
```javascript
function createStateMachine(initial, transitions) {
  // 你的实现
}

// 使用示例
const trafficLight = createStateMachine('red', {
  red: { next: 'green', timeout: 3000 },
  green: { next: 'yellow', timeout: 5000 },
  yellow: { next: 'red', timeout: 2000 }
});

trafficLight.current(); // 'red'
trafficLight.next();    // 3秒后自动变'green'
```

---

### 第四阶段：性能与优化（2天）
**目标**：解决闭包带来的性能问题

#### 实战任务 6：内存泄漏检测与修复
```javascript
// 泄漏场景重现
function setupLeak() {
  const bigData = new Array(1000000).fill('*');
  
  return function() {
    console.log('Leaking...');
    // 意外保留bigData引用
  };
}

// 修复方案对比
function setupFixed() {
  const bigData = new Array(1000000).fill('*');
  
  return function() {
    const usefulPart = bigData.slice(0, 10);
    console.log(usefulPart);
    // 释放大数组
    bigData = null; 
  };
}
```
**分析工具**：
1. Chrome Memory Profiler 快照对比
2. 使用WeakRef/WeakMap优化
3. 闭包链长度对性能的影响测试

#### 实战任务 7：高性能事件管理器
```javascript
function createEventEmitter() {
  // 优化版本实现
}

// 对比测试
const emitter = createEventEmitter();
emitter.on('event', handler1);
emitter.on('event', handler2);
emitter.emit('event', data);
emitter.off('event', handler1);
```

---

### 第五阶段：源码级理解（2天）
**目标**：通过实现核心库加深理解

#### 终极挑战：实现简化版Redux
```javascript
function createStore(reducer) {
  // 实现核心逻辑
  return {
    getState,
    dispatch,
    subscribe
  };
}

// 测试用例
const store = createStore(counterReducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'INCREMENT' });
```

**实现要点**：
1. 闭包管理应用状态
2. 订阅列表的内存安全实现
3. 中间件机制（闭包链）

---

### 实战工具箱
1. **调试利器**：
   - Chrome DevTools闭包作用域查看
   - `console.dir()`查看闭包详细信息
   ```javascript
   function outer() {
     const x = 10;
     function inner() {
       console.dir(inner); // 查看[[Scopes]]
     }
     return inner;
   }
   ```

2. **性能分析**：
   ```bash
   # 闭包性能压测
   npx bench closure-implementations.js
   ```

3. **代码审计**：
   ```bash
   # 检测闭包问题
   npx eslint --rule 'no-loop-func: error' src/
   ```

---

### 学习路径检查表
完成以下任务时自我验证：
- [ ] 能清晰解释V8引擎如何处理闭包
- [ ] 实现过至少3种内存泄漏防护模式
- [ ] 在框架源码中定位闭包应用（React/Vue）
- [ ] 对比闭包 vs Class的性能差异
- [ ] 手动实现过函数式编程工具库

**推荐深度阅读**：
1. [V8闭包优化机制](https://v8.dev/blog/preparser)
2. [ECMAScript词法环境规范](https://tc39.es/ecma262/#sec-lexical-environments)
3. [React Hooks闭包原理](https://github.com/reactjs/rfcs/blob/master/text/0068-react-hooks.md)

通过这套实战方案，你将在2-3周内系统掌握闭包从应用到原理的所有关键知识，并在实际项目中游刃有余地运用闭包解决复杂问题。