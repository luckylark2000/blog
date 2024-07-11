/**LeetCode 125. 验证回文串
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function (s) {
  // 正则：全局匹配所有非字符和数字的字符
  const REG = /[^a-zA-Z0-9]+/g;
  // 按题目描述先把大写字母改成小写字母，然后把非字母和数字的字符都替换成空
  const transform = s.toLowerCase().replace(REG, "");

  // 初始化双指针一个指向头一个指向尾
  let left = 0;
  let right = transform.length - 1;

  while (left <= right) {
    // 对称位置如果元素不相同就不是回文串
    if (transform[left] !== transform[right]) {
      return false;
    }
    // 对称位置如果元素相同就左右指针各自向中间移动一位
    left++;
    right--;
  }
  //循环结束，匹配完成返回true
  return true;
};
console.log(isPalindrome("A man, a plan, a canal: Panama"));
console.log(isPalindrome("race a car"));
