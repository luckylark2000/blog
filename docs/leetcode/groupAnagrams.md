# 前端高频面试算法之 LeetCode 49 异位词分组，代码逐行注释，附知识点整理

[[toc]]

这是一题中等难度的算法题，算是有一点综合性的题目，使用到的知识点稍微多一点，但是只要思路对了，再对一些 js 的代码有些熟练度，代码量还是很小的。

文章第一部分的题目描述和 leetcode 保持一致（熟悉的可以直接略过），接着是思路整理和代码（附加逐行注释），最后对代码中用到的知识点进行了一个整理，也包含 MDN 的文档链接，帮助大家回顾。

## 题目描述

[leetcode 异位词分组](https://leetcode.cn/problems/group-anagrams/description/)

给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

**字母异位词** 是由重新排列源单词的所有字母得到的一个新单词。

示例 1:

> 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
>
> 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]

示例 2:

> 输入: strs = [""]
>
> 输出: [[""]]

示例 3:

> 输入: strs = ["a"]
>
> 输出: [["a"]]

::: tip 提示：

1 <= strs.length <= 104

0 <= strs[i].length <= 100

strs[i] 仅包含小写字母
:::

## 解题思路

### 分析

拿到题目很自然的思路应该是把字符串数组中每一个字符串**按字符进行排序**，因为由相同字母组成的异位词有很多，但是所有异位词的字符串按字符排序后的字符串（也是个异位词）是唯一的。

如果想把异位词进行分组，那么这个排序后的字符串应该作为这个异位词所在分组的`分组标志`。例如`"ate","eat","tea"`这三个单词是一个分组，分组标志应该是`"aet"`

说到`分组标志`我们就应该想到`哈希表`，这种映射关系是哈希表的拿手活。练习多了就会慢慢形成条件反射。

### 解题步骤

- 初始化一个空的哈希表 map，脑袋里想象表的结构大致是：`{ key1 => [str1,str2,...], key2 => [str3,..], ... }`。其中键 key 是异位词的分组标志，也就是它对应的字符串数组中的每个字符串排序后的相同的字符串。值`[str1,str2,...]`是同一分组的异位词数组
- 遍历 strs 字符串数组
  - 把当前字符串 item 按字符排个序，排序后的字符串当做哈希表 map 的 key
  - if 判断 key 是否已经在 map 中
    - 如果 key 已经在 map 中就把当前字符串 item 加到 map 中 key 对应的字符数组中
    - 如果 key 不在 map 中，把当前字符串 item 转化成一个单元素数组[item]，向 map 中新增一个键值对 key->[item]
- 把 map 中的所有的 key 对应的异位词数组合并为一个二维数组并返回

## 代码

```js
/**异位词分组
 * @param {string[]} strs 一个字符串数组
 * @return {string[][]} 返回一个二维数组，也就是分组的异位词
 */
var groupAnagrams = function (strs) {
  // 初始化一个哈希表，表的结构大致是{ key1 => [str1,str2,...], key2 => [str3,..], ... }
  const map = new Map();
  // 遍历strs字符串数组，你如果用for循环也可以但是会复杂很多
  strs.forEach(item => {
    // 把当前字符串排个序当做哈希表map的key
    const key = item.split("").sort().join("");
    // 如果key已经在map中就把当前字符加到map中key对应的字符数组中
    // 如果key不在map中，就向map中新增一个键值对key->[item]
    if (map.has(key)) {
      map.get(key).push(item); //这里map.get(key)就是 key 所在异位词分组
    } else {
      map.set(key, [item]);
    }
  });
  // 把map中的所有的key对应的数组合并为一个二维数组并返回
  return Array.from(map.values());
  // 也可以用解构
  // return [...map.values()]
};
```

## 知识点复习

### 字符串 split 方法

[MDN split](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)

split()是字符串对象 String 一个实例方法，split() 方法接受一个模式，通过搜索模式将字符串分割成一个有序的子串列表，将这些子串放入一个数组，并返回该数组。

```ts
String.split(separator: string | RegExp, limit?: number): string[]
```

- 第一个参数接受一个字符串或者是正则表达式，作为分割器
- 第二个参数接受一个可选的数字表示返回的匹配的前几个

#### 指定分割字符

```js
"abc".split(""); //['a', 'b', 'c']
"a,b,c,d".split(","); //['a', 'b', 'c', 'd']
"hello world".split(" "); //['hello', 'world']
```

#### 正则分割

```js
"hello1world".split(/(\d)/); //['hello', '1', 'world']
```

#### 限制返回数量

```js
"abc".split("", 2); //['a', 'b']
"hello1world".split(/(\d)/, 1); //['hello']
```

### 数组 sort，join，push 方法

#### sort

[MDN sort](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

sort() 方法**就地**对数组的元素进行排序，并返回对相同数组的引用。sort()函数接收一个可选的 compareFn 比较函数，如果不传默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。

> [!IMPORTANT] 提示
> sort()方法会改变原数组的内容，如果不想改变原数组的内容可以使用`toSorted`方法

对于比较函数 compareFn
| compareFn(a, b) 返回值 | 排序顺序|
|---------------------|------------------|
| &gt; 0 | a 在 b 后，如 [b, a] |
| &lt; 0 | a 在 b 前，如 [a, b] |
| === 0 | 保持 a 和 b 原来的顺序 |

举例：

```js
const arr = ["hello", "world", "ni", "hao"];
arr.sort();
console.log(arr); //['hao', 'hello', 'ni', 'world']
```

::: warning 注意
sort()默认排序是将元素转换为字符串，然后按照它们的 UTF-16 码元值升序排序。如果是数字的话可能不是按预期进行排序的
:::

```js
const nums1 = [10, 1, 20, 3, 2];
nums1.sort(); //这里排序是将nums中的数组转为字符串，按字符串排序的
console.log(nums1); // [1, 10, 2, 20, 3]

// 正确的数组排序方式
const nums2 = [10, 1, 20, 3, 2];
nums2.sort((a, b) => a - b); //升序
console.log(nums2); //  [1, 2, 3, 10, 20]
```

#### join

[MDN join](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

将数组所有元素按照指定的分隔符拼接成一个字符串，返回值是该字符串，原元素组并不会发生改变，如果不传参就默认用逗号拼接。

```js
const arr = ["hello", "a", "b", "c"];
arr.join(); //'hello,a,b,c'
arr.join(" "); //'hello a b c'
arr.join("-"); //'hello-a-b-c'
arr.join(", "); //'hello, a, b, c'
```

#### push

[MDN push](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

就是向数组的末尾增加一个元素，返回数组的长度，注意会改变原数组。

```js
let arr = [1, 2, 3];
d.push(7); //返回值是数组arr的长度4
```

### ES6 Map 使用

[MDN Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

Map 是 ES6 新增的数据结构，用来存储键值对，键是唯一的，可以快速判断键是否存在。任何值（对象或者原始值）都可以作为键或值。

#### 构造函数

- Map() 构造函数创建 Map 对象。

#### 实例方法

- Map 实例的 set() 方法会向 Map 对象添加或更新一个指定的键值对。

- Map 实例的 delete() 方法从该 map 中删除指定键的元素。
- Map 实例的 get() 方法返回该 map 中的指定元素。如果与所提供的键相关联的值是一个对象，那么你将获得该对象的引用，对该对象所做的任何更改都会有效地在 Map 对象中修改它。
- Map 实例的 has() 方法返回一个布尔值，指示具有指定键的元素是否存在。
- Map 实例的 clear() 方法会移除该 map 中的所有元素。
- Map 实例的 keys() 方法返回一个新的 map 迭代器对象，该对象包含了此 map 中每个元素的键，按插入顺序排列。
- Map 实例的 values() 方法返回一个新的 map 迭代器对象，该对象包含此 map 中每个元素的值，按插入顺序排列。
- Map 实例的 entries() 方法返回一个新的 map 迭代器对象，该对象包含了此 map 中的每个元素的 [key, value] 对，按插入顺序排列。
- Map 实例的 forEach() 方法按插入顺序对该 map 中的每个键/值对执行一次提供的函数。

#### 实例属性

- Map 实例的 size 访问器属性返回此 map 中元素的数量。

#### 代码示例

基础示例用法（更多示例用法见[MDN Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map) ）：

```js
// Map() 构造函数创建 Map 对象。
const map = new Map();
const myMap = new Map([
  [1, "one"],
  [2, "two"],
  [3, "three"]
]);
// 增
map.set("name", "张三");
map.set("age", 18);
// 删
map.delete("name"); //true
// 查
map.has("age"); //true
map.get("age"); //18
// 改
map.set("age", 19); //true
map.get("age"); //19

map.size; //1

map.clear(); //清空map
map.size; //0
```

## 总结

本文讲解了 LeetCode 中的异位词分组算法，是一道中等难度的题目，最主要是考察思路和知识点的运用，除去注、释括号部分，核心代码 10 行左右。

文章最后对算法中用到的知识点做了一个系统的整理和复习也都贴了相关的 MDN 链接，包含 split、sort、join、push、Map 等知识点，希望能够对大家有所帮助，有收获的话可以点个赞哟。
