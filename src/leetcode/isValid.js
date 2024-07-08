// 有效的括号leetcode 20

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid = function (s) {
  // 把字符串拆分成字符数组
  const arr = s.split("");
  //   初始化一个空的栈
  const stack = [];
  //   为括号创建映射关系，使得同类型的左右括号互为相反数，方便判断
  const map = {
    "(": -1,
    ")": 1,
    "[": -2,
    "]": 2,
    "{": -3,
    "}": 3
  };

  // 每次从数组最左边取出一个括号，直到取完为止
  while (arr.length !== 0) {
    let arrLeft = arr.shift(); //数组最左边取出一个括号
    // 如果当前数组左边第一个元素和栈顶元素是互补括号，且栈顶元素是左括号，就弹出栈顶元素，
    // 否者把当前数组左边第一个元素压栈
    if (map[arrLeft] + map[stack.at(-1)] === 0 && map[stack.at(-1)] < 0) {
      stack.pop();
    } else {
      stack.push(arrLeft);
    }
  }
  // 循环结束括号数组为空的时候，如果栈是空就是有效括号匹配，栈不是空就是无效
  return stack.length === 0;
};

/**
 * @param {string} s
 * @return {boolean}
 */
const isValid2 = function (s) {
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    switch (s[i]) {
      case "[":
        stack.push("]");
        break;
      case "(":
        stack.push(")");
        break;
      case "{":
        stack.push("}");
        break;
      default:
        if (stack.pop() !== s[i]) {
          return false;
        }
    }
  }
  return stack.length === 0;
};

console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("()"));
