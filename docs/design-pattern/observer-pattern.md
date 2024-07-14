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

### DOM 事件

button 的点击事件，一个 button 的 click 可以绑定多个监听回调函数

### Vue React 组件生命周期

### Vue 的 watch

watchEffect 和 watch 监听 ref 和 reactive 数据，immediate，deep 等等

### Vue 组件更新过程

官方图片，主要是 watcher 监听 data 部分是观察者模式

### 各种异步操作

定时器 setTimeout，setInterval

Promise.then

Node 中的，stream, readline,httpServer

```js
// stream 读取字符
const fs =require('fs');
const readStream =fs.createReadStream('./data/yarn.lock.txt');
//文件字符的Length
let length =0;
readStream.on('data',function (chunk){
const curLength = chunk.toString().length;
console.log('current length',curLength);
length += curLength;
})
readStream.on('end',function(){
console.log(length);
}
```

```js
const readline =require('readline')
const fs =require('fs')
const rl=readline.createInterface({
input:fs.createReadStream('./data/yarn.lock.txt')
})
//文件有多少行
let lineNum =0

rl.on('line'，function(line){
lineNum++})

rl.on('close'，function(){
console.log('lineNum',lineNum)
})
```

### MutationObserver

异步监听，当被监听的对象发生了变化，就会触发`MutationObserver的回调函数`

```js
const callback: MutationCallback = (
  records: MutationRecord[],
  observer: MutationObserver
) => {
  for (const record of records) {
    console.log(record);
  }
  console.log(observer);
};

const observer = new MutationObserver(callback);

const el = document.getElementById("container");
if (el) {
  // 开启监听
  observer.observe(el, {
    attributes: true, //监听属性
    attributeFilter: ["style"], //声明哪些属性名会被监听的数组
    childList: true, //监听 target 节点中发生的节点的新增与删除
    attributeOldValue: true, //监听老的属性
    characterData: true, //监听文本
    subtree: true, //监听以 target 为根节点的整个子树
    characterDataOldValue: true //监听老的文本节点
  });

  const p1 = document.createElement("p");
  p1.innerText = "hello";

  el.appendChild(p1);
  p1.style.color = "red";
  p1.innerHTML = `<div>hhhhh</div>`;
}
```
