# 哈哈哈，再战前端 LeeCode 算法之两数之和 twoSum，两种解法精讲，含 ES6 Map 知识点复习

从本次文章开始，我就开启前端 LeetCode 算法的刷题系列更新了，主要更新一些前端面试高频的算法题目，会包含解题思路和代码手写，算法用到的知识点回顾，如果看完本文觉得还不错的话，可以点波关注不迷路

<!-- markdownlint-disable -->

[[toc]]

## :tada:题目描述

[LeetCode 地址](https://leetcode.cn/problems/two-sum/)

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值 `target` 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

你可以按任意顺序返回答案。

示例 1：

> 输入：nums = [2,7,11,15], target = 9
>
> 输出：[0,1]
>
> 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。

示例 2：

> 输入：nums = [3,2,4], target = 6
>
> 输出：[1,2]

示例 3：

> 输入：nums = [3,3], target = 6
>
> 输出：[0,1]

::: tip 提示

2 <= nums.length <= 104

-109 <= nums[i] <= 109

-109 <= target <= 109

只会存在一个有效答案

:::

::: info 进阶
你可以想出一个时间复杂度小于 O(n<sup>2</sup>) 的算法吗？
:::

## :monocle_face:解题思路

简而言之就是在一个数组中找到两个数，使得它们的和等于目标值，记录并返回这两个数的下标。接下来我们讲两种解法。

### :ok_hand:暴力解法

两层 for 循环：

外层循环 i 从 0 开始，内层循环 j 从 i+1 开始。

- 初始外层 for 循环 i=0，然后内层 for 循环遍历数组中第 1 到 `nums.length - 1` 的所有的数字，如果找到和等于 `target` 的`nums[i]`与`nums[j]`，返回 `[i, j]`。

- 如果没有找到，外层 for 循环 `i++`，继续下一轮内层 for 循环遍历。

- 直到找到这两个数，返回此时的 `[i, j]`。

代码：

```js{9-11}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
};
```

使用两层 for 循环，时间复杂度： O(n<sup>2</sup>)

### :100:哈希表

前置知识：ES6 的 Map， 文档地址：[MDN Map](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)，文档后面讲讲 Map 的基础用法

基础使用

解题步骤：

- 先初 new 一个空的哈希表 map
- for 循环从 i = 0 到 nums.length - 1 遍历数组，如果 map 有键`target-nums[i])`（或者访问键`target-nums[i])`对应的值不是`undefined` ），就 return [i, map.get(target-nums[i])]
- 否者，就把`nums[i]`作为键，i 作为值，存储到 map 中。

::: warning 注意
这里往 map 中存储的键值对一定是存储`nums[i]`作为键，i 作为值，而不是 i 作为键，`nums[i])`作为值。

因为 Map 的键是作为键值对访问的唯一标识，只能通过键来判断键值对是否存在，不能通过值来判断键值对是否存在，若要判断 `target-nums[i]`是否和`nums[x]`相等，只能把`nums[i]`当作键。
:::
代码：

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const twoSum = function (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    // 另一种if语句写法
    // if(map.get(target - nums[i]) !== undefined)
    if (map.has(target - nums[i])) {
      return [i, map.get(target - nums[i])];
    } else {
      map.set(nums[i], i);
    }
  }
};
```

时间复杂度分析：
一层 for 循环，时间复杂度 O(n)，Map 的访问速度是常数级接近 O(1)，所以总的时间复杂度是 O(n)。

## ES6 的 Map

Map 是 ES6 新增的数据结构，用来存储键值对，键是唯一的，可以快速判断键是否存在。任何值（对象或者原始值）都可以作为键或值。

### 构造函数

- Map() 构造函数创建 Map 对象。

### 实例方法

- Map 实例的 set() 方法会向 Map 对象添加或更新一个指定的键值对。

- Map 实例的 delete() 方法从该 map 中删除指定键的元素。
- Map 实例的 get() 方法返回该 map 中的指定元素。如果与所提供的键相关联的值是一个对象，那么你将获得该对象的引用，对该对象所做的任何更改都会有效地在 Map 对象中修改它。
- Map 实例的 has() 方法返回一个布尔值，指示具有指定键的元素是否存在。
- Map 实例的 clear() 方法会移除该 map 中的所有元素。
- Map 实例的 keys() 方法返回一个新的 map 迭代器对象，该对象包含了此 map 中每个元素的键，按插入顺序排列。
- Map 实例的 values() 方法返回一个新的 map 迭代器对象，该对象包含此 map 中每个元素的值，按插入顺序排列。
- Map 实例的 entries() 方法返回一个新的 map 迭代器对象，该对象包含了此 map 中的每个元素的 [key, value] 对，按插入顺序排列。
- Map 实例的 forEach() 方法按插入顺序对该 map 中的每个键/值对执行一次提供的函数。

### 实例属性

- Map 实例的 size 访问器属性返回此 map 中元素的数量。

### 代码示例

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

本文探讨了 LeetCode 中的"两数之和"问题的两种解法：一是暴力解法，使用双层循环，时间复杂度 O(n^2)；二是更高效的哈希表解法，利用 ES6 Map 存储遍历过程，以 O(n)时间复杂度完成。文章最后详细回顾了 Map 的使用，包括创建、插入、删除、查询操作及属性，通过示例代码加深理解。

如果觉得还不错的话，可以点个赞哟，如果你也在刷算法的话，也可以点波关注，更多 LeetCode 算法持续更新中。
