// let a = 1
// let b=2
// function makeFunc() {
//   const name = "Mozilla";
  
//   function displayName() {
//     console.log(name,a);
//   }
//   function sayHello() {
//     const word =  "hello";
//     console.log(word,b);
//   }
//   sayHello()

//   return displayName;
// }

// const myFunc = makeFunc();
// myFunc();
/* ---------------------*/
// let d= 1
// function init() {
//   d=3
//   let name = "Mozilla"; // name 是 init 创建的局部变量
//   function displayName() {
//     // displayName() 是内部函数，它创建了一个闭包
//     console.log(name,d); // 使用在父函数中声明的变量
//   }
//   displayName();
// }
// let c = init;
// c()

// console.log(1, d);
/* ---------------------*/
// 工厂函数
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

const add5 = makeAdder(5);
const add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
console.log('end');
