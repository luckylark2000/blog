/** 暴力法
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement1 = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      for (let j = i; j < nums.length; j++) {
        nums[j] = nums[j + 1];
      }
      nums.length--;
      i--;
    } else {
      k++;
    }
  }
  return k;
};

/** 使用split方法
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement2 = function (nums, val) {
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      nums.splice(i, 1);
      i--; //i--是为了防止出现nums中有连续的val被跳过，因为splice使数组长度-1，而下一轮循环i会+1
    }
  }
  //   或者倒着遍历，就不用考虑i--的问题了
  //   for (let i = nums.length - 1; i > -1; i--) {
  //     if (nums[i] === val) {
  //       nums.splice(i, 1);
  //     }
  //   }
  return nums.length;
};

/** 双指针方法:首位指针
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement3 = function (nums, val) {
  let left = 0;
  let right = nums.length - 1;

  while (left <= right) {
    if (nums[end] === val) {
      end--;
    } else {
      // 交换左右的值
      [nums[left], nums[end]] = [nums[end], nums[left]];
      left++;
    }
  }
  return left;
};

/** 双指针方法:快慢指针
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement4 = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== val) {
      nums[k] = nums[i];
      k++;
      // 也可以二合一
      // nums[k++] = nums[i];
    }
  }
  return k;
};

console.log(removeElement3([0, 1, 2, 2, 3, 0, 4, 2], 2));
