# 工厂模式

遇到 new Class 的地方，就要考虑到工厂模式

## 概念

## UML 类图

![alt text](/images/uml-factory-standard.png)

## 代码

```ts
// 产品接口
interface IProduct {
  name: string;
  fn1: () => void;
  fn2: () => void;
}

// 实现IProduct接口的Product1产品类
class Product1 implements IProduct {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fn1() {
    console.log("Product1的fn1");
  }
  fn2() {
    console.log("Product1的fn2");
  }
}

// 实现IProduct接口的Product2产品类
class Product2 implements IProduct {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  fn1() {
    console.log("Product2的fn1");
  }
  fn2() {
    console.log("Product2的fn2");
  }
}

// 工厂类
class Creator {
  // 依赖倒置原则
  create(type: "p1" | "p2", name: string): IProduct {
    if (type === "p1") {
      return new Product1(name);
    }
    if (type === "p2") {
      return new Product2(name);
    }
    throw new Error("请传入正确的type");
  }
}

const creator = new Creator();

const a = creator.create("p1", "a");
console.log(a);
a.fn1();
```

## 分析

应用原则：

- 依赖倒置原则
- 开放封闭原则

- 工厂和类分离，解耦
- 可以扩展多个类（派生类，或者平行类）
- 工厂的创建逻辑也可以自由扩展

## 应用

### jQuery 的 $

### Vue 的 h 函数(\_createElementVNode)

### React 的 createElement

## 重要细节

typescript 扩展 window 属性
declare

对 vnode 的理解
