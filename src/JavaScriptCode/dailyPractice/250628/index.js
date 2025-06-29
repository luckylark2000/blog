function* counter() {
  let count = 1;
  while (true) {
    const reset = yield count++;
    if (reset) {
      count = 1;
    }
  }
}

// const gen = counter();
// console.log(gen.next().value);
// console.log(gen.next().value);
// console.log(gen.next(true).value);
// console.log(gen.next().value);

// 生成器函数思考
// 每调用一次 next 就执行到第几个 yield
// yield 后跟随的表达式的值是此次生成器函数的返回值，外部可以通过 gen.next().value 取得这个返回值，并暂停生成器函数内部的执行。
//.next(v) 函数的传参v，总是传递给上一个yield 表达式左侧的赋值位置，所以在第一次调用 .next() 时传入的参数，在当前生成器函数中是无法被使用的。

function* number(first) {
  console.log("first", first);
  let a = yield 1;
  console.log("a", a);
  let b = yield 2;
  console.log("b", b);
  yield 3;
}
// const g = number("hello");
// console.log(g.next().value);
// console.log(g.next("world").value);
// console.log(g.next("hh").value);
// console.log(g.next("oo").value);

function* pause() {
  let a = 0;
  yield;
  a++;

  yield;
  a++;

  yield a;
  return "end";
}

const p = pause();
// p.next();
// p.next();
// console.log(p.next().value);
console.log(p.next());
console.log(p.next());
console.log(p.next());
console.log(p.next());

let s = pause();
for (let i of s) {
  console.log(i);
}
console.log(s.next());
