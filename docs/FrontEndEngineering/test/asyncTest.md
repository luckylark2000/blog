# Jest 异步测试如何编写

异步测试经常会使用 nextTick 这个方法

## 请求模拟

使用 mock 来模拟请求，在被测试文件的最近一级新建一个`__mocks__`文件夹，文件夹里面写一个 axios.js，里面写上对一些接口的请求地址，和 Promise 返回值，Jest 在执行测试用例的时候就会自动请求这个文件

## 延时操作

done 操作，指定测试的结束位置

为了让延时操作可以快速执行，可以使用 Jest 的方法`jest.useFakeTimers()`，模拟延时操作`jest.useFakeTimers()`放在顶部，跟 import 一样的位置就行，在需要模拟的地方使用`jest.runAllTimers()`

有时候为了让各个测试之间效果互不影响，比如 expect 某些操作被调用多少次，特别是全局 api,setTimeout 之类，可以使用 beforeEach 来重置每次的执行环境，例如

```js
beforeEach(() => {
  jest.useFakeTimers();
});
```
