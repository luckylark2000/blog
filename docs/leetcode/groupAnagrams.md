# 异位词分组

[[toc]]

## 题目描述

## 解题思路

## 代码

```js
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  // 新建一个哈希Map用来存储键值对
  const map = new Map();
  strs.forEach(item => {
    // 对当前字符串item进行字符排序，作为map的键
    const cur = item.split("").sort().join("");
    // 如果说map中有这个键就把item存储到对应的值（是一个数组）中
    // 否则新建一个cur->[item]的键值对
    if (map.has(cur)) {
      map.get(cur).push(item);
    } else {
      map.set(cur, [item]);
    }
  });
  //   最后把map中所有的键值对的所有的“值”取出来放到数组返回即可
  return [...map.values()];
};
```

## 知识点复习

### 字符串 split 方法

### 数组 sort，join，push 方法

### 对比数组的 forEach 和 map 方法

### ES6 Map 使用
