/**常规暴力解法思路
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive = function (nums) {
  // 数组排序且去重
  const setNums = [...new Set(nums.sort((a, b) => a - b))];
  let max = 0;
  let curLen = 0;
  for (let i = 0; i < setNums.length; i++) {
    // 计算有序的连续序列长度
    if (setNums[i - 1] !== undefined && setNums[i - 1] === setNums[i] - 1) {
      curLen++;
    } else {
      // 不连续就从当前位置计数1
      curLen = 1;
    }
    // 更新max
    max = Math.max(max, curLen);
  }
  return max;
};

/**比较难想到
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive2 = function (nums) {
  // 初始化一个空的哈希表用来存储值对应的长度
  const map = new Map();
  let max = 0;
  for (const num of nums) {
    if (!map.has(num)) {
      // num - 1 在map里面的记录的最大连续序列长度
      const preNumLen = map.get(num - 1) || 0;
      // num + 1 在map里面的记录的的最大连续序列长度
      const nextNumLen = map.get(num + 1) || 0;

      //   计算当前的数组的所在序列的长度，做法就是将断层的两个长度连接起来
      const curNumLen = preNumLen + 1 + nextNumLen;
      //   将当前计算的长度按照num->curNumLen记录到map
      map.set(num, curNumLen);
      //   更新max
      curNumLen > max && (max = curNumLen);
      // 更新num所属连续序列的最小值在map中的值为curNumLen，连续序列的其他值不必更新
      map.set(num - preNumLen, curNumLen);
      // 更新num所属连续序列的最大值在map中的值为curNumLen
      map.set(num + nextNumLen, curNumLen);
    }
  }
  return max;
};

/**可能好想一点
 * @param {number[]} nums
 * @return {number}
 */
const longestConsecutive3 = function (nums) {
  // 初始化一个空的哈希表用来存储值对应的长度
  const set = new Set(nums);
  //   初始化max
  let max = 0;
  for (let num of set) {
    // 找每段连续序列的起始值，不是起始值就不会执行循环体
    if (!set.has(num - 1)) {
      let curLen = 0;
      // 从起始值开始计算连续序列的长度
      while (set.has(num)) {
        curLen++;
        num++;
      }
      //   更新max
      max = Math.max(max, curLen);
    }
  }
  console.log(set);
  return max;
};

console.log(longestConsecutive3([9, 8, 7, 6, 5, 4, 3, 2, 1]));

// console.log(longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]));
