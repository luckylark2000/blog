# 单例模式

一个系统全局只能有一个

登录框，遮罩层，全局状态管理器 Vuex 和 Redux 的 store，自定义事件 EventBus 全局唯一

## UML 类图

![单例模式UML类图](/images/uml-singleton-pattern.png)

## 代码

```ts
// 单例模式
class Singleton {
  // 静态私有属性
  private static instance: Singleton | null;

  // 外面无法实例化，不能new
  private constructor() {}

  // 静态公开属性
  static getInstance(): Singleton {
    if (Singleton.instance == null) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const a = Singleton.getInstance();
const b = Singleton.getInstance();
```

```ts
// 支持通过getInstance(name: string)设置参数的单例模式
class Singleton1 {
  name: string;
  // 静态私有属性
  private static instance: Singleton1 | null;

  // 外面无法实例化，不能new
  private constructor(name: string) {
    this.name = name;
  }

  // 静态公开属性
  static getInstance(name: string): Singleton1 {
    if (Singleton1.instance == null) {
      Singleton1.instance = new Singleton1(name);
    }
    return Singleton1.instance;
  }
}
```

```ts
// ts例子
const d = Singleton1.getInstance("ddd");

const e = Singleton1.getInstance("ddd");

console.log(d === e);
console.log(d);
```

```js
// js 实现---------------------------

function genGetInstance() {
  let instance = null;

  class Single {}
  return () => {
    if (instance == null) {
      instance = new Single();
    }
    return instance;
  };
}
const genInstance = genGetInstance();
let jsa = genInstance();
let jsb = genInstance();

console.log(jsa === jsb); //true
```

## 是否符合设计原则

- 内部封装 getInstance, 高内聚，低耦合

```

```
