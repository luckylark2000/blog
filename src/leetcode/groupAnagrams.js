/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  const map = new Map();
  strs.forEach(item => {
    const c = item.split("").sort().join("");
    if (map.has(c)) {
      map.set(c, [item, ...map.get(c)]);
    } else {
      map.set(c, [item]);
    }
  });
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
