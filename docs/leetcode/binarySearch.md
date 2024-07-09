# 二分查找

[[toc]]

这道二分查找是一道比较基础的题目，一些中小厂在面试无经验或低年限经验的同学的时候考察的概率比较大。

## 题目描述

[LeetCode 二分查找](https://leetcode.cn/problems/binary-search/description/)

给定一个 n 个元素有序的（升序）整型数组 `nums` 和一个目标值 `target` ，写一个函数搜索 `nums` 中的 `target`，如果目标值存在返回下标，否则返回 -1。

示例 1:

> 输入: nums = [-1, 0, 3, 5, 9, 12], target = 9
>
> 输出: 4
>
> 解释: 9 出现在 nums 中并且下标为 4

示例 2:

> 输入: nums = [-1, 0, 3, 5, 9, 12], target = 2
>
> 输出: -1
>
> 解释: 2 不存在 nums 中因此返回 -1

::: tip 提示：

- 你可以假设 `nums` 中的所有元素是不重复的。
- n 将在 [1, 10000]之间。
- nums 的每个元素都将在 [-9999, 9999]之间。
  :::

## 解题思路

题目已经说明了数组有序，因此可以使用二分查找，时间复杂度 O(logn)
步骤：

- 定义左右指针 left 和 right，初始值分别指向 0 和 n-1 位置

- while 循环判断，当左指针小于等于右指针时，执行循环体
  - 定义中间指针 mid，值为 `left+Math.floor((right-left) / 2)`
  - 如果中间指针指向的元素等于目标值，返回中间指针
  - 如果中间指针指向的元素大于目标值，将右指针指向`mid - 1`
  - 如果中间指针指向的元素小于目标值，将左指针指向`mid + 1`
- 循环结束后，返回 -1，表示没找到

> [!IMPORTANT]
>
> > `mid - 1`和`mid + 1`非常重要，不能直接使用`mid`，因为要保证每次循环搜索范围都在减小，不然如果数组中只剩一个元素容易陷入无限循环。

## 代码

```js{4,9}
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
const search = function (nums, target) {
  let left =0;//初始化左指针
  let right =nums.length-1//初始化右指针

  // 左指针在右指针左边才执行循环体
  while(left<=right){
    // 找中间位置，用下面这种写法而不用Math.floor((right+left)/2)是为了防止 right+left超过数字表示上限
    let mid=left + Math.floor((right-left)/2)

    // 解题思路和注意事项中有
    if(nums[mid]===target){
      return mid
    }else if(nums[mid]>target){
      right=mid-1
    }else{
      left=mid+1
    }
  }
  // 没找到返回 -1
  return -1
};
```

## 关于 Math 的知识点拓展

[MDN Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)
Math 是一个内置对象，它拥有一些数学常数属性和数学函数方法。Math 不是一个函数对象。

Math 不是一个构造器。Math 的所有属性与方法都是静态的。例如：引用圆周率的写法是 Math.PI

### Math 常用静态方法和属性

- Math.ceil() 静态方法总是向上舍入，并返回大于等于给定数字的最小整数。
- Math.floor() 函数总是返回小于等于一个给定数字的最大整数。
- Math.max() 函数返回作为输入参数的最大数字，如果没有参数，则返回 -Infinity。
- Math.min() 函数返回作为输入参数的数字中最小的一个，如果没有参数，则返回 Infinity。
- Math.random() 静态方法返回一个大于等于 0 且小于 1 的伪随机浮点数，并在该范围内近似均匀分布，然后你可以缩放到所需的范围
- Math.round() 函数返回一个数字四舍五入后最接近的整数
- Math.PI 表示一个圆的周长与直径的比例，约为 3.14159，只可读，不可写，不可枚举，不可配置

### 代码示例

```js
Math.ceil(4); //4
Math.ceil(0.95); //1
Math.ceil(7.004); //8
Math.ceil(-7.004); //-7

Math.floor(5.95); //5
Math.floor(-5.05); //-6

Math.max(-1, -3, -2); //-1

const array1 = [1, 3, 2];
Math.max(...array1); //3

Math.min(-2, -3, -1); //-3
Math.min(...array1); //1

x = Math.round(20.49); //20
x = Math.round(-20.5); //-20

function calculateCircumference(radius) {
  return 2 * Math.PI * radius;
}
calculateCircumference(1); // 6.283185307179586
```

## 总结

这道二分查找是一道比较基础的题目，值得注意的地方就是：1、双指针思路，2、中间值的求法，3、left 和 right 两个指针每次经过一次循环要利用`mid +或者- 1`进行必须的区间缩小处理。最后复习了 JavaScript 中内置 Math 对象的常用静态方法和属性。

有收货的话可以点个赞哟，更多算法提持续更新中，点波关注不迷路，下一期会更新一道中等难度的算法题。
