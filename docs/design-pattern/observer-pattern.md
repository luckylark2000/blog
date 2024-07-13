# 观察者模式

应用最多的设计模式，所有前端需要人机交互的界面都需要观察者模式，比如说按钮点击事件

## UML 类图

![观察者模式UML类图](/images/uml-observer-pattern.png)

## 代码演示

```ts
// 观察者模式

// 观察者
class Observer {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  update(state: number) {
    console.log(`${this.name} is update, state is `, state);
  }
}

// 主题
class Subject {
  private state: number = 0;
  private observers: Observer[] = [];

  // 获取当前状态
  getState(): number {
    return this.state;
  }

  // 设置状态后立即通知观察者
  setState(newState: number) {
    this.state = newState;
    this.notify(); //通知观察者更新
  }

  // 添加观察者
  attach(observer: Observer) {
    this.observers.push(observer);
  }

  // 通知所有观察者更新的私有方法
  private notify() {
    this.observers.forEach(ob => {
      ob.update(this.state);
    });
  }
}

// 例子

const ob1 = new Observer("Jack");
const ob2 = new Observer("Mary");

const sub = new Subject();
sub.attach(ob1);

sub.setState(1);
sub.attach(ob2);
sub.setState(4);

// 打印输出
// Jack is update, state is  1
// index.ts:9 Jack is update, state is  4
// index.ts:9 Mary is update, state is  4
```

## 是否符合设计模式

- Observer 和 Subject 分离，解耦
- Observer 可自由扩展
- Subject 可自由扩展

## 观察者模式应用场景

DOM 事件

Vue React 组件生命周期

Vue 的 watch

Vue 组件更新过程

各种异步操作

MutationObserver
