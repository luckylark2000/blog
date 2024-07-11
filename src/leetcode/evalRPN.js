/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  let left;
  let right;
  const numsStack = [];
  const op = ["+", "-", "*", "/"];
  while (tokens.length !== 0) {
    const cur = tokens.shift();
    if (op.includes(cur)) {
      right = numsStack.pop();
      left = numsStack.pop();
      switch (cur) {
        case "+":
          numsStack.push(left + right);
          break;
        case "-":
          numsStack.push(left - right);
          break;
        case "*":
          numsStack.push(left * right);
          break;
        default:
          // 除法取整数，注意不能使用Math的取整方法因为floor对负数向下取整不符合预期，ceil对正数向上取整不符合预期
          numsStack.push(parseInt(left / right, 10)); //方法二：numsStack.push(left / right | 0);
      }
    } else {
      numsStack.push(+cur);
    }
  }
  return numsStack[0];
};

// console.log(evalRPN(["2", "1", "+", "3", "*"]));
// console.log(evalRPN(["4", "13", "5", "/", "+"]));
console.log(
  evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"])
);
