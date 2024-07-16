/**异位词分组
 * @param {string[]} strs 一个字符串数组
 * @return {string[][]} 返回一个二维数组，也就是分组的异位词
 */
var groupAnagrams = function (strs) {
  // 初始化一个哈希表，表的结构大致是{ key1 => [str1,str2,...], key2 => [str3,..], ... }
  const map = new Map();
  // 遍历strs字符串数组
  strs.forEach(item => {
    // 把当前字符串排个序当做哈希表map的key
    const key = item.split("").sort().join("");
    // 如果key已经在map中就把当前字符加到map中key对应的字符数组中
    // 如果key不在map中，就向map中新增一个键值对key->[item]
    if (map.has(key)) {
      map.get(key).push(item);
    } else {
      map.set(key, [item]);
    }
  });
  // 把map中的所有的key对应的数组合并为一个二维数组并返回
  return Array.from(map.values());
};

const res = groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]);

// 错误版本
// var groupAnagrams2 = function (strs) {
//   const result = [];
//   // 统计每个单词的每个单词的字符频率
//   const map = new Map();
//   for (let i = 0; i < strs.length; i++) {
//     if (map.has(getCharFrequency(strs[i]))) {
//       for (let j = 0; j < result.length; j++) {
//         if (result[j][0] === getCharFrequency(strs[i])) {
//           result[j].push(strs[i]);
//           break;
//         }
//       }
//     } else {
//       map.set(getCharFrequency(strs[i]), strs[i]);
//     }
//   }
//   return result;
// };

// function getCharFrequency(str) {
//   let charFrequency = {};
//   for (let i = 0; i < str.length; i++) {
//     if (charFrequency[str[i]]) {
//       charFrequency[str[i]]++;
//     } else {
//       charFrequency[str[i]] = 1;
//     }
//   }
//   return charFrequency;
// }
