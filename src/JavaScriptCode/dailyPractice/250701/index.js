const items = ["apple", "banana", "cherry", "date"];

const result = items
  .map((item) => item.toUpperCase()) //所有项变成大写字母
  .filter((item) => item.length > 5) //筛选长度大于5的项
  .reduce((acc, item, index) => {
    return acc + (index === 0 ? "" : "-") + item.slice(0, 3); //使用减号拼接字符串的前三个字母
  }, "");

console.log(result); //BAN-CHE

//知识点：map、filter、reduce
