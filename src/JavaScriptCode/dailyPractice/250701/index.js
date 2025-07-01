const items = ["apple", "banana", "cherry", "date"];

const result = items
  .map((item) => item.toUpperCase()) //所有项变成大写字母
  .filter((item) => item.length > 5) //筛选长度大于5的项
  .reduce((acc, item, index) => {
    return acc + (index === 0 ? "" : "-") + item.slice(0, 3); //使用减号拼接字符串的前三个字母
  }, "");

console.log(result); //BAN-CHE

//知识点：map、filter、reduce

// -------------------------------------

const calculator = {
  value: 10,
  add: function (x) {
    return this.value + x;
  },
  multiply: function (x) {
    return this.value * x;
  },
};

const add5 = calculator.add;
const double = calculator.multiply.bind(calculator);
const triple = calculator.multiply.bind({ value: 3 });
console.log(add5(2));
console.log(double(3));
console.log(triple(4));

console.log(add5(2) + double(3) + triple(4));

// add5(2) = undefined + 2 = NaN
// double(3) = 10 * 3 = 30
// triple(4) = 3 * 4 = 12

//考察知识点：this、bind、undefined + 数字、NaN
