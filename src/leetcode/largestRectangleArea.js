/**暴力解leetcode 84. 柱状图中最大的矩形（提交会超时）
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  // 初始化最大面积的值
  let maxArea = 0;
  for (let i = 0; i < heights.length; i++) {
    // 初始化左右双指针都指向i
    let left = i;
    let right = i;
    // 矩形高度
    const RectHeight = heights[i];
    // 往左找到第一个比矩形高度小的元素的下标
    while (left > -1) {
      if (heights[left] >= RectHeight) {
        left--;
      } else {
        break;
      }
    }
    // 往右找到第一个比矩形高度小的元素的下标
    while (right < heights.length) {
      if (heights[right] >= RectHeight) {
        right++;
      } else {
        break;
      }
    }
    // 计算矩形宽度
    const RectWidth = right - left - 1;
    // 更新矩形的面积
    maxArea = Math.max(maxArea, RectHeight * RectWidth);
  }
  return maxArea;
};
console.log(largestRectangleArea([2, 1, 5, 6, 2, 3]));
// console.log(largestRectangleArea([1, 2, 3, 4]));
// console.log(largestRectangleArea([4, 3, 2, 1]));
console.log(largestRectangleArea([1, 2, 1, 3, 1]));
var largestRectangleArea = function (heights) {
  // 初始化最大面积的值
  let maxArea = 0;
  // 给height的左右都添加0，方便边界处理和计算矩形宽度
  heights = [0, ...heights, 0];
  // 初始化单调栈，栈顶是最大值，栈底是最小值
  const stack = [];
  for (let i = 0; i < heights.length; i++) {
    // 如果当前元素比单调栈栈顶所存储的数组下标在heights中对应的元素小
    while (heights[i] < heights[stack[stack.length - 1]]) {
      // 矩形高度，就是单调栈的栈顶元素
      const RectHeight = heights[stack.pop()];
      // 右边第一个比当前矩形高度RectHeight小的元素的下标，也就是当前的i
      const right = i;
      // 左边第一个比当前矩形高度RectHeight小的元素的下标，就是单调栈中的栈顶元素
      const left = stack[stack.length - 1];
      //矩形的宽度
      const RectWidth = right - left - 1;
      // 更新最大矩形面积
      maxArea = Math.max(maxArea, RectHeight * RectWidth);
    }
    // while循环后，当前元素比栈顶元素大，把当前下标压入栈中，压入下标是为了方便计算矩形宽度
    stack.push(i);
  }
  return maxArea;
};
