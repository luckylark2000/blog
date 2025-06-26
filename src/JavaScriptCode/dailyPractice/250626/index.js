const text = 'Today is 2023-12-31 and tomorrow is 2024-01-01';
const dateRegex = /(\d{4})-(\d{2})-(\d{2})/g;

let result = '';
let match=''

while ((match = dateRegex.exec(text)) !== null) {
  console.log(dateRegex.lastIndex);// exec会记住上一次匹配的位置
  const [fullMatch, year, month, day] = match;
  result += `${day}/${month}/${year.slice(2)} `;
  console.log(fullMatch);// exec会记住上一次匹配的位置
}

console.log(result.trim());