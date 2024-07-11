# 逆波兰表达式求值 150

## 题目描述

给你一个字符串数组 tokens ，表示一个根据 逆波兰表示法 表示的算术表达式。

请你计算该表达式。返回一个表示表达式值的整数。

注意：

有效的算符为 '+'、'-'、'\*' 和 '/' 。
每个操作数（运算对象）都可以是一个整数或者另一个表达式。
两个整数之间的除法总是 向零截断 。
表达式中不含除零运算。
输入是一个根据逆波兰表示法表示的算术表达式。
答案及所有中间计算结果可以用 32 位 整数表示。

示例 1：

输入：tokens = ["2","1","+","3","*"]
输出：9
解释：该算式转化为常见的中缀算术表达式为：((2 + 1) \* 3) = 9
示例 2：

输入：tokens = ["4","13","5","/","+"]
输出：6
解释：该算式转化为常见的中缀算术表达式为：(4 + (13 / 5)) = 6
示例 3：

输入：tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
输出：22
解释：该算式转化为常见的中缀算术表达式为：
((10 -(6 / ((9 + 3) - -11))) + 17) + 5
= ((10 - (6 / (12 - -11))) + 17) + 5
= ((10 - (6 / -132)) + 17) + 5
= ((10 - 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

提示：

1 <= tokens.length <= 104
tokens[i] 是一个算符（"+"、"-"、"\*" 或 "/"），或是在范围 [-200, 200] 内的一个整数

逆波兰表达式：

逆波兰表达式是一种后缀表达式，所谓后缀就是指算符写在后面。

平常使用的算式则是一种中缀表达式，如 ( 1 + 2 ) - ( 3 + 4 ) 。
该算式的逆波兰表达式写法为 ( ( 1 2 + ) ( 3 4 + ) - ) 。
逆波兰表达式主要有以下两个优点：

去掉括号后表达式无歧义，上式即便写成 1 2 + 3 4 + \* 也可以依据次序计算出正确结果。
适合用栈操作运算：遇到数字则入栈；遇到算符则取出栈顶两个数字进行计算，并将结果压入栈中

## 解题思路

## 代码

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function (tokens) {
  // 创建一个栈，用来存储操作数
  const numsStack = [];
  //创建一个数组用来
  const ops = ["+", "-", "*", "/"];
  while (tokens.length !== 0) {
    let cur = tokens.shift();
    // 如果cur是一个运算符就从操作数栈弹出两个栈顶元素，进行计算
    // 否者就把cur转为数字压入操作数栈的栈顶
    if (ops.includes(cur)) {
      // 操作数栈弹出两个栈顶元素，第一个是右操作数，第二个是左操作数
      const right = numsStack.pop();
      const left = numsStack.pop();
      //
      switch (cur) {
        case "+":
          numsStack.push(left + right);
          break;
        case "-":
          numsStack.push(left - right);
          break;
        case "*":
          numsStack.push(left * right);
          break;
        default:
          numsStack.push(parseInt(left / right));
          break;
      }
    } else {
      numsStack.push(+cur);
    }
  }
  return numsStack[0];
};
```

代码二

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function (tokens) {
  // 创建一个栈，用来存储操作数
  const numsStack = [];
  //创建一个数组用来
  const ops = new Set(["+", "-", "*", "/"]);
  while (tokens.length !== 0) {
    let cur = tokens.shift();
    // 如果cur是一个运算符就从操作数栈弹出两个栈顶元素，进行计算
    // 否者就把cur转为数字压入操作数栈的栈顶
    if (ops.has(cur)) {
      // 操作数栈弹出两个栈顶元素，第一个是右操作数，第二个是左操作数
      const right = numsStack.pop();
      const left = numsStack.pop();
      //
      switch (cur) {
        case "+":
          numsStack.push(left + right);
          break;
        case "-":
          numsStack.push(left - right);
          break;
        case "*":
          numsStack.push(left * right);
          break;
        default:
          numsStack.push(parseInt(left / right));
          break;
      }
    } else {
      numsStack.push(+cur);
    }
  }
  return numsStack[0];
};
```

代码三

```js
/**
 * @param {string[]} tokens
 * @return {number}
 */
const evalRPN = function (tokens) {
  // 创建一个栈，用来存储操作数
  const numsStack = [];

  //tokens不为空时执行循环体
  while (tokens.length !== 0) {
    // 从tokens最左边取出一个元素
    let cur = tokens.shift();

    // 如果cur是一个运算符就从操作数栈弹出两个栈顶元素，进行计算
    // 否者就把cur转为数字压入操作数栈的栈顶
    if (isNaN(+cur)) {
      // 操作数栈弹出两个栈顶元素，第一个是右操作数，第二个是左操作数
      const right = numsStack.pop();
      const left = numsStack.pop();
      //匹配到什么运算符就执行什么计算
      switch (cur) {
        case "+":
          numsStack.push(left + right);
          break;
        case "-":
          numsStack.push(left - right);
          break;
        case "*":
          numsStack.push(left * right);
          break;
        default:
          numsStack.push(parseInt(left / right));
          break;
      }
    } else {
      numsStack.push(+cur);
    }
  }
  return numsStack[0];
};
```

## 知识点

### 字符串转数字

### 数组方法

shift,includes,push, pop

### 数字取整

### ES6 Set
