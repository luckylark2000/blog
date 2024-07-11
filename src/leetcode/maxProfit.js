/**121. 买卖股票的最佳时机
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // 初始化利润为0
  let profit = 0;
  //   初始化滑动区间
  let left = 0;
  let right = 1;
  //  当right还没超出数组长度执行循环体
  while (right < prices.length) {
    // 取profit最大值
    profit = Math.max(prices[right] - prices[left], profit);
    // 滑动区间最左边的值比右边的值大，就把左指针右移，进入下一轮循环
    if (prices[left] > prices[right]) {
      left++;
      continue;
    }
    // 做指针对应的元素大小没有超过右指针就把右指针右移动一位
    right++;
  }

  return profit;
};

/**解法二
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit2 = function (prices) {
  let profit = 0,
    cost = prices[0];
  for (let i = 0; i < prices.length; i++) {
    // 取目前为止最小的股票价格
    cost = Math.min(cost, prices[i]);
    // prices[i] - cost为当前价格减去最低股票价格
    // 更新profit
    profit = Math.max(prices[i] - cost, profit);
  }
  return profit;
};

console.log(maxProfit([7, 1, 5, 3, 6, 4]));
console.log(maxProfit([7, 6, 4, 3, 1]));
