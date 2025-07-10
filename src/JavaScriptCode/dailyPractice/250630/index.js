const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const result = numbers
  .filter(num => num % 2 === 0)//2,4,6,8,10
  .map(num => num * 2)//4,8,12,16,20
  .reduce((acc, curr, idx, arr) => {
    if (idx === arr.length - 1) {
      return (acc + curr) / arr.length;
    }
    return acc + curr;
  }, 0);//(4+8+12+16+20)/5 = 12

console.log(result);

